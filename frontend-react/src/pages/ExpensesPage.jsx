import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { createExpense, deleteExpense, getExpenses } from "../services/expenses.api";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);

    async function handleAddExpense(data) {
        const newExpense = await createExpense(data);
        setExpenses(prev => [...prev, newExpense]);
    }

    async function handleDeleteExpense(id) {
        try {
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getExpenses().then(setExpenses)
    }, []);

    return (
        <>
            <ExpenseForm onAddExpense={handleAddExpense}/>
            <ExpenseList expenses = {expenses} onDelete = {handleDeleteExpense}/>
        </>     
    );
}

