import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { createExpense, getExpenses } from "../services/expenses.api";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);

    async function handleAddExpense(data) {
        const newExpense = await createExpense(data);
        setExpenses(prev => [...prev, newExpense]);
    }

    useEffect(() => {
        getExpenses().then(setExpenses)
    }, []);

    return (
        <>
            <ExpenseForm onAddExpense={handleAddExpense}/>
            <ExpenseList expenses = {expenses}/>
        </>     
    );
}

