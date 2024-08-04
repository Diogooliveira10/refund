// select form elements.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// selects the elements from the list.
const expenseList = document.querySelector("ul")
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
    } catch (error) {
        console.log(error)
        alert("Unable to update totals.")
    }
}