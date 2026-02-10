const API_URL = "http://localhost:8000/";


async function getExpenses() {
    try {
        const response = await fetch(`${API_URL}expenses/`);
    
        if (!response.ok) {
            throw new Error("Error fetching expenses");
        }

        const data = await response.json();
        return data;

    }
    catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
}

async function getExpense(id) {
    try {
        const response = await fetch(`${API_URL}expenses/${id}`);
         
        if (!response.ok) {
            throw new Error("Error fetching expense");
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching expense:", error);
        return null;
    }
}

async function createExpense(data) {
    try {
        const response = await fetch(`${API_URL}expenses/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error("Error creating expense");
        }
        return true;

    }
    catch (error) {
        console.error("Error creating expense:", error);
        return false;
    }
}

async function updateExpense(id, data) {
    try {
        const response = await fetch(`${API_URL}expenses/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error updating expense");
        }
        return true;

    }
    catch (error) {
        console.error("Error updating expense:", error);
        return false;
    }
}

async function deleteExpense(id) {
    try {
        const response = await fetch(`${API_URL}expenses/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error deleting expense");
        }

        return true;
    }
    catch (error) {
        console.error("Error deleting expense:", error);
        return false;
    }
}