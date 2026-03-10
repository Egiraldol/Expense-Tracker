import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { createExpense, updateExpense, deleteExpense, getExpenses, getTotalExpenses } from "../services/expenses.api";
import TotalExpenses from "../components/expenses/TotalExpenses";
import { DateFilter } from "../components/expenses/DateFilter";
import "./ExpensesPage.css"

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [filterMode, setFilterMode] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [dateRange, setDateRange] = useState({
        start: "",
        end: ""
    });

    const filteredExpenses = expenses.filter(expense => {

        const expenseDate = new Date(expense.date);

        if (filterMode === "all") {
            return true;
        }

        if (filterMode === "range") {
            if (dateRange.start && expenseDate < new Date(dateRange.start)) return false;
            if (dateRange.end && expenseDate > new Date(dateRange.end)) return false;
            return true;
        }

        if (filterMode === "month") {
            const expenseMonth = expenseDate.toISOString().slice(0,7);
            return expenseMonth === selectedMonth;
        }

    });

    const filteredTotal = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

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
        <div className="expensesPage">
            <div className="form">
                <ExpenseForm onAddExpense={handleAddExpense}/>
            </div>

            <div className="list">
                <DateFilter
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    setFilterMode={setFilterMode}
                    setSelectedMonth={setSelectedMonth}
                />
                <ExpenseList 
                    expenses={filteredExpenses}
                    editingId={editingId}
                    onDelete={handleDeleteExpense}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                />
            </div>

            <div className="total">
                <TotalExpenses total={filteredTotal}/>
            </div>
        </div>     
    );
}

