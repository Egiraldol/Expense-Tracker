const API_URL = "http://localhost:8000/";


async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    if (response.status === 204) return null;
    return response.json();
}

export const getExpenses = () => 
    request("expenses/");

export const getExpense = (id) => 
    request(`expenses/${id}`);

export const createExpense = (data) => 
    request("expenses/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

export const updateExpense = (id, data) =>
    request(`expenses/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

export const deleteExpense = (id) =>
    request(`expenses/${id}`, {
        method: "DELETE"
    });

export const getTotalExpenses = () =>
    request("expenses/total/");