// select form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// capture the input event to format the value
amount.oninput = () => {
// gets the current value of the input and removes non-numeric characters.
    let value = amount.value.replace(/\D/g, "")

    // convert the value into cents.
    value = Number(value) / 100

    // updates the input value.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // formats the value in the BRL (Brazilian Real) standard.
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    // returns the formatted value
    return value
}

form.onsubmit = (event) => {
    event.preventDefault()
}