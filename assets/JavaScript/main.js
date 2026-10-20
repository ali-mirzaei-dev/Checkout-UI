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

const cardBoxes = Array.from(allInputsNumber)

// ============================================================
//  HELPER FUNCTIONS (defined first so they're hoisted properly)

// ------- TOAST ------- //
let toastTimer
function toast(message, type = 'error') {
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
    const styles = {
        success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-400 shadow-[0_10px_30px_rgba(16,185,129,0.4)] scale-105',
        error: 'bg-white text-red-600 border-2 border-red-500 shadow-lg'
    }
    toastEl.className = `px-6 py-4 rounded-xl font-semibold text-base ${styles[type]} transition-all duration-300`
    toastEl.textContent = message

    container.appendChild(toastEl)
    toastTimer = setTimeout(() => toastEl.remove(), 3000)
}

function showFieldError(input, message) {
    clearFieldError(input)
    if (!message) return

    input.classList.add('border-red-500', 'ring-2', 'ring-red-200')
    input.classList.remove('border-[#E3F2FD]', 'border-[#90CAF9]')

    const errorEl = document.createElement('p')
    errorEl.className = 'field-error text-red-500 text-xs font-medium ml-1 flex items-center gap-1'
    errorEl.innerHTML = `<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"/></svg>${message}`

    if (input.parentNode.classList.contains('flex')) {
        input.parentNode.insertAdjacentElement('afterend', errorEl)
    } else {
        input.insertAdjacentElement('afterend', errorEl)
    }
}

function clearFieldError(input) {
    input.classList.remove('border-red-500', 'ring-2', 'ring-red-200')
    input.classList.add('border-[#E3F2FD]')

    const errorEl = input.parentNode.classList.contains('flex')
        ? input.parentNode.nextElementSibling
        : input.nextElementSibling

    if (errorEl && errorEl.classList.contains('field-error')) {
        errorEl.remove()
    }
}

function setError(input, hasError) {
    if (hasError) {
        input.classList.add('border-red-500', 'ring-2', 'ring-red-200')
        input.classList.remove('border-[#E3F2FD]', 'border-[#90CAF9]')
    } else {
        clearFieldError(input)
    }
}

// ------- NAME INPUT ------- //
inputName.addEventListener("input", () => {
    clearFieldError(inputName)

    if (/[^a-zA-Z\s]/.test(inputName.value)) {
        inputName.value = inputName.value.replace(/[^a-zA-Z\s]/g, "")
        toast('Name should only contain letters')
        return
    }
    creaditName.innerText = inputName.value
})

// ------- CARD NUMBER INPUT ------- //
allInputsNumber.forEach((val, i) => {
    val.addEventListener("input", () => {
        cardBoxes.forEach(box => clearFieldError(box))

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
        allInputsNumber.forEach((r, idx) => {
            creditNumber.textContent += r.value
            if (idx !== allInputsNumber.length - 1 && r.value.length === 4) {
                creditNumber.textContent += '-'
            }
        })
    })
})

// ------- MONTH INPUT ------- //
inputMonth.addEventListener("input", () => {
    clearFieldError(inputMonth)

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

// ------- YEAR INPUT ------- //
inputYear.addEventListener("input", () => {
    clearFieldError(inputYear)

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

inputYear.addEventListener("blur", () => {
    if (inputYear.value.length === 0) return
    const currentYear = Number(new Date().getFullYear().toString().slice(-2))
    if (Number(inputYear.value) < currentYear) {
        toast('Card has expired')
    }
})

// ------- CVV2 INPUT ------- //
inputCVV.addEventListener("input", () => {
    clearFieldError(inputCVV)

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

// ------- CAPTCHA ------- //
const captchaCharacter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]
const captchaLength = captchaCharacter.length

function generateCaptcha() {
    captchaText.innerText = ""
    for (let i = 0; i < 5; i++) {
        const tempCaptcha = Math.floor(Math.random() * captchaLength)
        captchaText.innerText += captchaCharacter[tempCaptcha]
    }
}
generateCaptcha()
refreshCaptcha.addEventListener("click", generateCaptcha)

inputCaptcha.addEventListener("input", () => {
    clearFieldError(inputCaptcha)
})

// ------- SUBMIT BUTTON ------- //
submitPayment.addEventListener("click", (e) => {
    e.preventDefault()

    const allCardBoxesFilled = cardBoxes.every(box => box.value.length === 4)

    const fields = [
        { input: inputName, error: inputName.value.trim() === "", msg: "Name is required" },
        { input: null, error: !allCardBoxesFilled, msg: "Card number must be 16 digits" },
        { input: inputMonth, error: inputMonth.value.length < 2, msg: "Month is required" },
        { input: inputYear, error: inputYear.value.length < 2, msg: "Year is required" },
        { input: inputCVV, error: inputCVV.value.length < 3 || inputCVV.value.length > 4, msg: "CVV2 must be 3-4 digits" },
        { input: inputCaptcha, error: captchaText.innerText !== inputCaptcha.value, msg: "Captcha is incorrect" }
    ]
    console.log(fields);
    

    let hasErrors = false
    let firstErrorInput = null

    fields.forEach(field => {
        if (field.error) {
            hasErrors = true
            if (!firstErrorInput) firstErrorInput = field.input || cardBoxes[0]

            if (field.input === null) {
                cardBoxes.forEach(box => {
                    box.classList.add('border-red-500', 'ring-2', 'ring-red-200')
                    box.classList.remove('border-[#E3F2FD]', 'border-[#90CAF9]')
                })
                showFieldError(cardBoxes[0], field.msg)
            } else {
                showFieldError(field.input, field.msg)
            }
        } else {
            if (field.input === null) {
                cardBoxes.forEach(box => clearFieldError(box))
            } else {
                clearFieldError(field.input)
            }
        }
    })

    if (!hasErrors) {
        toast("Payment submitted successfully!", "success")

    } else {
        const firstErrorMsg = fields.find(f => f.error).msg
        toast(firstErrorMsg)
        refreshCaptcha.click()
        inputCaptcha.value = ""

        if (firstErrorInput) {
            firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
            setTimeout(() => firstErrorInput.focus(), 400)
        }
    }
})