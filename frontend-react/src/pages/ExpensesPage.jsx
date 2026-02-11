import { useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpensesList";

function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);

    return (
        <>
            <ExpenseForm />
            <ExpenseList />
        </>     
    );
}

export default ExpensesPage;