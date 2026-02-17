import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { createExpense, updateExpense, deleteExpense, getExpenses } from "../services/expenses.api";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);

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
    async function handleUpdate(id, updatedData) {
        try {
            const updatedExpense = await updateExpense(id, updatedData);

            setExpenses(prev =>
                prev.map(exp =>
                    exp.id === id ? updatedExpense : exp
                )
            );

            setEditingId(null);
        } catch (error) {
            console.error(error);
        }
    }


    function handleEdit(id) {
        setEditingId(id);
    }

    function handleCancel() {
        setEditingId(null);
    }


    useEffect(() => {
        getExpenses().then(setExpenses)
    }, []);

    return (
        <>
            <ExpenseForm onAddExpense={handleAddExpense}/>
            <ExpenseList 
                expenses={expenses}
                editingId={editingId}
                onDelete={handleDeleteExpense}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
            />
        </>     
    );
}

