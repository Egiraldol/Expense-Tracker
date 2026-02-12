import { useEffect, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";
import { getExpenses } from "../services/expenses.api";

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses().then(setExpenses)
    }, []);

    return (
        <>
            <ExpenseForm />
            <ExpenseList expenses = {expenses}/>
        </>     
    );
}
