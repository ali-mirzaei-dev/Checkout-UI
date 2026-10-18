const inputName = document.getElementById("inputName")
const creaditName = document.getElementById("creaditName")
const allInputsNumber = document.querySelectorAll("#cardNumbersInputParent>input")
const creditNumber = document.getElementById("creditNumber")
const inputMonth = document.getElementById("inputMonth")
const inputYear = document.getElementById("inputYear")

// ------- NAME INPUT ------- //
inputName.addEventListener("input", () => {

    let tempNameValue = inputName.value
    creaditName.innerText = tempNameValue
})

// ------- NUMBER INPUTS ------- //
allInputsNumber.forEach((val, i) => {
    val.addEventListener("input", () => {

        if (val.value !== "" && isNaN(val.value)) {
            // alert("Numbers only!")
            val.value = val.value.slice(0, -1)
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

// ------- EPIRES UNPUTS ------- //