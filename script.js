// select form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// selects the elements from the list.
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

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

// adds a new item to the list.
function expenseAdd(newExpense) {
    try {
        // creates the li element to add the item to the list (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // create the category icon.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // create expense information.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // create the name of the expense.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // create the expense category.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // adds name and category to the expense information div.
        expenseInfo.append(expenseName, expenseCategory)

        // creates the value of the expense.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // creates the remove icon.
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // adds information to the item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // add the item to the list.
        expenseList.append(expenseItem)

        // clears the form to add a new item.
        formClear()

        // updates the totals.
        updateTotals()

    } catch (error) {
        alert("Unable to update the expense list.")
        console.log(error)
    }
}

// updates the totals.
function updateTotals() {
    try {
        // retrieves all items (li) from list (ul).
        const items = expenseList.children
        
        // updates the number of items in the list.
        expenseQuantity.textContent = `${items.length} ${
            items.length > 1 ? "despesas" : "despesa"
        }`

        // variable to increment the total.
        let total = 0

        // loop through each item (li) in the list (ul).
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            // remove non-numeric characters and correct the comma by the period.
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // converts the value to float.
            value = parseFloat(value)

            // check if it is a valid number.
            if(isNaN(value)) {
                return alert(
                    "The total could not be calculated. The value does not appear to be a number."
                )
            }

            // increase the total value.
            total += Number(value)
        }

        // create the span to add the formatted R$.
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // formats the value and removes R$ which will be displayed by small with a custom style.
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // clearing the element content.
        expensesTotal.innerHTML = ""

        // adds the currency symbol and formatted total amount.
        expensesTotal.append(symbolBRL, total)
    } catch (error) {
        alert("Unable to update totals.")
        console.log(error)
    }
}

// event that captures clicking on list items.
expenseList.addEventListener("click", function (event) {

    // check if the clicked element is the remove icon.
    if (event.target.classList.contains("remove-icon")) {
        // Gets the (li) of the element.
        const item = event.target.closest(".expense")
        // remove item from the list.
        item.remove()
    }
    // updates the totals.
    updateTotals()
})

// clears form inputs.
function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    // puts the focus on the amount input.
    expense.focus()
}