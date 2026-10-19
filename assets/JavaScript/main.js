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


// ------- NAME INPUT ------- //
inputName.addEventListener("input", () => {

    let tempNameValue = inputName.value
    creaditName.innerText = tempNameValue
})

// ------- NUMBER INPUTS ------- //
allInputsNumber.forEach((val, i) => {
    val.addEventListener("input", () => {

        if (val.value !== "" && isNaN(val.value)) {
            val.value = val.value.replace(/[^0-9]/g, "")
            toast('Card number should only contain numbers')
            return
        }

        if (val.value.length >= 4 && i != 3) {
            val.value = val.value.slice(0, 4)
            val.nextElementSibling.focus()
        } else if (val.value.length >= 4 && i == 3) {
            inputMonth.focus()
        }

        creditNumber.innerText = ''
        allInputsNumber.forEach((r, i) => {
            creditNumber.innerText += r.value
            if (i !== allInputsNumber.length - 1 && r.value.length === 4) creditNumber.innerHTML += '-'
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

        if (inputMonth.value > 12) {
            inputMonth.value = inputMonth.value.slice(0, -1)
            toast("Month must be 1-12 digits")
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