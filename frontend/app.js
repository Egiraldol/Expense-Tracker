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

expensesList.addEventListener('submit', async function (e) {
    if (e.target.classList.contains('edit-form')) {
        e.preventDefault();
        await handleUpdate(e.target);
    }
});

expensesList.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-cancel')) {
        const expenses = await getExpenses();
        renderExpenses(expenses);
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

async function getExpense(expenseId) {
    try {
        const response = await fetch(`${API_URL}/expenses/${expenseId}`);

        if (!response.ok) {
            throw new Error("Error fetching expense");
        }

        const expense = await response.json();
        return expense;
    }
    catch(error) {
        console.error('Error:', error);
        return null;
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

async function handleEdit(expenseId) {
    const expense = await getExpense(expenseId);

    if (!expense) return;

    renderEditForm(expense);
}

function renderEditForm(expense) {
    const card = document.querySelector(
        `.btn-edit[data-id="${expense.id}"]`
    ).closest('.expense-item');

    card.innerHTML = `
        <form class="edit-form" data-id="${expense.id}">
            <input type="number" name="amount" value="${expense.amount}" required>

            <select name="category" required>
                ${renderCategoryOptions(expense.category)}
            </select>

            <textarea name="description">${expense.description || ''}</textarea>

            <input type="date" name="date" value="${expense.date}" required>

            <button type="submit">Save</button>
            <button type="button" class="btn-cancel">Cancel</button>
        </form>
    `;
}

function renderCategoryOptions(selected) {
    const categories = [
        'Food',
        'Transport',
        'Entertainment',
        'Services',
        'Health',
        'Shopping',
        'Others'
    ];

    return categories
        .map(cat =>
            `<option value="${cat}" ${cat === selected ? 'selected' : ''}>
                ${cat}
            </option>`
        )
        .join('');
}

async function handleUpdate(form) {
    const expenseId = form.dataset.id;

    const updatedData = {
        amount: parseFloat(form.amount.value),
        category: form.category.value,
        description: form.description.value,
        date: form.date.value
    };

    const updatedExpense = await updateExpense(expenseId, updatedData);

    if (updatedExpense) {
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
