import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { createExpense, updateExpense, deleteExpense, getExpenses, getTotalExpenses } from "../services/expenses.api";
import TotalExpenses from "../components/expenses/TotalExpenses";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);

    async function handleAddExpense(data) {
        const newExpense = await createExpense(data);
        setExpenses(prev => [...prev, newExpense]);

        await refreshTotal()
    }

    async function handleDeleteExpense(id) {
        try {
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));

            await refreshTotal()
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

            await refreshTotal()
        } catch (error) {
            console.error(error);
        }
    }

    async function refreshTotal() {
        const data = await getTotalExpenses();
        setTotalExpenses(data.total);
    }

    function handleEdit(id) {
        setEditingId(id);
    }

    function handleCancel() {
        setEditingId(null);
    }


    useEffect(() => {
        getExpenses().then(setExpenses);

        async function fetchTotal() {
            const data = await getTotalExpenses();
            setTotalExpenses(data.total);
        }
        fetchTotal();
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
            <TotalExpenses total={totalExpenses}/>
        </>     
    );
}

