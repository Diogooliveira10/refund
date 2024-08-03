// select form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// selects the elements from the list.
const expenseList = document.querySelector("ul")

// capture the input event to format the value.
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

// captures the form's submit event to obtain the values.
form.onsubmit = (event) => {
    // prevents the default behavior of reloading the page.
    event.preventDefault()

    // creates an object with the details on the new expense.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }

    // calls the function that will add the item to the list.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        // creates the li element to add the item to the list (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // create the category icon.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // adds information to the item.
        expenseItem.append(expenseIcon)

        // add the item to the list.
        expenseList.append(expenseItem)
    } catch (error) {
        alert("Unable to update the expense list.")
        console.log(error)
    }
}