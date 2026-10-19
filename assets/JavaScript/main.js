const inputName = document.getElementById("inputName")
const creaditName = document.getElementById("creaditName")
const allInputsNumber = document.querySelectorAll("#cardNumbersInputParent>input")
const creditNumber = document.getElementById("creditNumber")
const inputMonth = document.getElementById("inputMonth")
const inputYear = document.getElementById("inputYear")
const creditDateMonth = document.getElementById("creditDateMonth")
const creditDateYear = document.getElementById("creditDateYear")
const inputCVV = document.getElementById("inputCVV")
const creditCVV2 = document.getElementById("creditCVV2")
const captchaText = document.getElementById("captchaText")
const refreshCaptcha = document.getElementById("refreshCaptcha")
const submitPayment = document.getElementById("submitPayment")
const inputCaptcha = document.getElementById("inputCaptcha")

// ------- NAME INPUT ------- //
inputName.addEventListener("input", () => {
    if (/[^a-zA-Z\s]/.test(inputName.value)) {
        inputName.value = inputName.value.replace(/[^a-zA-Z\s]/g, "")
        toast('Name should only contain letters')
        return
    }
    creaditName.innerText = inputName.value
})

// ------- NUMBER INPUTS ------- //
allInputsNumber.forEach((val, i) => {
    val.addEventListener("input", () => {

        if (/[^0-9]/.test(val.value)) {
            val.value = val.value.replace(/[^0-9]/g, "")
            toast('Card number should only contain numbers')
        }

        if (val.value.length >= 4 && i != 3) {
            val.value = val.value.slice(0, 4)
            val.nextElementSibling.focus()
        } else if (val.value.length >= 4 && i == 3) {
            val.value = val.value.slice(0, 4)
            inputMonth.focus()
        }

        creditNumber.textContent = ''
        allInputsNumber.forEach((r, i) => {
            creditNumber.textContent += r.value
            if (i !== allInputsNumber.length - 1 && r.value.length === 4) {
                creditNumber.textContent += '-'
            }
        })
    })
})

// ------- MONTH EPIRES INPUTS ------- //
inputMonth.addEventListener("input", () => {

    if (inputMonth.value !== "" && isNaN(inputMonth.value)) {
        inputMonth.value = inputMonth.value.replace(/[^0-9]/g, "")
        toast('Month should only contain numbers')
        return
    }

    if (inputMonth.value.length >= 2) {

        if (Number(inputMonth.value) === 0 || Number(inputMonth.value) > 12) {
            inputMonth.value = inputMonth.value.slice(0, -1)
            toast("Month must be between 01-12")
            return
        }
        inputMonth.value = inputMonth.value.slice(0, 2)
        inputYear.focus()
    }
    creditDateMonth.innerText = inputMonth.value
})

// ------- YEAR EPIRES INPUTS ------- //
inputYear.addEventListener("input", () => {

    if (inputYear.value !== "" && isNaN(inputYear.value)) {
        inputYear.value = inputYear.value.replace(/[^0-9]/g, "")
        toast('Year should only contain numbers')
        return
    }

    if (inputYear.value.length >= 2) {
        inputYear.value = inputYear.value.slice(0, 2)
        inputCVV.focus()
    }
    creditDateYear.innerText = inputYear.value

})

// ------- CHECKS IF THE CARD IS EXPIRED ------- //
inputYear.addEventListener("blur", () => {
    if (inputYear.value.length === 0) return
    const currentYear = Number(new Date().getFullYear().toString().slice(-2))
    if (Number(inputYear.value) < currentYear) {
        toast('Card has expired')
    }
})


// ------- CVV2 INPUT ------- //
inputCVV.addEventListener("input", () => {

    if (inputCVV.value !== "" && isNaN(inputCVV.value)) {
        inputCVV.value = inputCVV.value.replace(/[^0-9]/g, "")
        toast('CVV2 should only contain numbers')
        return
    }


    if (inputCVV.value.length > 4) {
        inputCVV.value = inputCVV.value.slice(0, 4)
        toast('CVV2 must be 3-4 digits')

    }
    creditCVV2.innerText = inputCVV.value
})

// ------- CHECKS THE CVV2 ------- //
inputCVV.addEventListener("blur", () => {
    if (inputCVV.value.length === 0) return
    if (inputCVV.value.length < 3) {
        toast('CVV2 must be 3-4 digits')
    }
})

// ------- TOAST ------- //
let toastTimer
function toast(message) {
    let container = document.getElementById('toastContainer')
    if (!container) {
        container = document.createElement('div')
        container.id = 'toastContainer'
        container.className = 'fixed top-0 left-0 right-0 z-[9999] flex justify-start p-4'
        document.body.appendChild(container)
    }

    container.innerHTML = ''
    clearTimeout(toastTimer)

    const toastEl = document.createElement('div')
    toastEl.className = 'bg-white text-red-600 border-2 border-red-500 px-5 py-3 rounded-lg shadow-lg'
    toastEl.textContent = message

    container.appendChild(toastEl)
    toastTimer = setTimeout(() => toastEl.remove(), 3000)
}

const captchaCharacter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

const captchaLength = captchaCharacter.length

for (i = 0; i < 5; i++) {
    let tempCaptcha = (Math.floor(Math.random() * captchaLength));

    captchaText.innerText += captchaCharacter[tempCaptcha]
}

refreshCaptcha.addEventListener("click", () => {

    captchaText.innerText = ""
    let tempCaptcha = ""

    for (i = 0; i < 5; i++) {
        tempCaptcha = (Math.floor(Math.random() * captchaLength));

        captchaText.innerText += captchaCharacter[tempCaptcha]
    }
})


submitPayment.addEventListener("click", (e) => {
    e.preventDefault()

    const cardBoxes = Array.from(allInputsNumber)
    const allCardBoxesFilled = cardBoxes.every(box => box.value.length === 4)

    const errors = []

    if (inputName.value.trim() === "") errors.push("Name is required")
    if (!allCardBoxesFilled) errors.push("Card number must be 16 digits")
    if (inputMonth.value.length < 2) errors.push("Month is required")
    if (inputYear.value.length < 2) errors.push("Year is required")
    if (inputCVV.value.length < 3 || inputCVV.value.length > 4) errors.push("CVV2 must be 3-4 digits")
    if (captchaText.innerText !== inputCaptcha.value) errors.push("Captcha is incorrect")

    if (errors.length === 0) {
        toast("Payment submitted successfully!")
    } else {
        toast(errors[0])
        refreshCaptcha.click()
        inputCaptcha.value = ""
    }
})