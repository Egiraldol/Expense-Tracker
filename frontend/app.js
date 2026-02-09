const API_URL = 'http://localhost:8000';


const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const totalAmount = document.getElementById('total-amount');


document.addEventListener('DOMContentLoaded', init);

expenseForm.addEventListener('submit', handleFormSubmit);

expensesList.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        handleDelete(e.target.dataset.id);
    }

    if (e.target.classList.contains('btn-edit')) {
        handleEdit(e.target.dataset.id);
    }
});

async function createExpense(expenseData) {
    try {
        const response = await fetch(`${API_URL}/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error('Error creating expense');
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error('Error', error);
        return null;
    }
}

async function getExpenses() {
    try {
        const response = await fetch(`${API_URL}/expenses/`);
        
        if (!response.ok) {
            throw new Error('Error fetching expenses');
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function updateExpense(expenseId, expenseData) {
     try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error('Error updating expense');
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error('Error', error);
        return null;
    }
}

async function deleteExpense(expenseId) {
    try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting expense');
        }

        return true;
    }

    catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function getTotalExpenses() {
    try {
        const response = await fetch(`${API_URL}/expenses/total/`);

        if (!response.ok) {
            throw new Error('Error fetching total expenses');
        }

        const data = await response.json();
        return data.total;
    }

    catch (error) {
        console.error('Error:', error);
        return 0;
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const expenseData = getFormData();
    
    const createdExpense = await createExpense(expenseData);

    if (!createdExpense) return;
    
    const expenses = await getExpenses();
    renderExpenses(expenses);
    updateTotal();

    expenseForm.reset();
    console.log("Form submitted");
    console.log(expenseData);
}

function getFormData() {
    return {
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value
    }
}

async function handleDelete(expenseId) {
    const success = await deleteExpense(expenseId);

    if (success){
        const expenses = await getExpenses();
        renderExpenses(expenses);
        updateTotal();
    }
}

function renderExpenses(expenses) {
    expensesList.innerHTML = '';

    if (expenses.length === 0) {
        expensesList.innerHTML = '<p>No expenses yet</p>';
        return;
    }

    expenses.forEach(expense => {
        const card = createExpenseCard(expense);
        expensesList.appendChild(card);
    });
}

function createExpenseCard(expense) {
    const expenseCard = document.createElement('div');
    expenseCard.className = 'expense-item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'expense-info';

    const title = document.createElement('h5');
    title.textContent = `$${expense.amount} - ${expense.category}`

    const desc = document.createElement('p');
    desc.textContent = expense.description || 'No description';

    const date = document.createElement('small');
    date.textContent = expense.date;

    infoDiv.appendChild(title);
    infoDiv.appendChild(desc);
    infoDiv.appendChild(date);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'expense-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = 'Edit';
    editBtn.dataset.id = expense.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = expense.id;

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    expenseCard.appendChild(infoDiv);
    expenseCard.appendChild(actionsDiv);

    return expenseCard;
}

async function updateTotal() {
    const total = await getTotalExpenses();
    totalAmount.textContent = `$${total}`;
}
 
async function init() {
    const expenses = await getExpenses();
    renderExpenses(expenses);
    updateTotal();
}
