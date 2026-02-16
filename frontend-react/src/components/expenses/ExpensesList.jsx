import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete }) {
    if (expenses.length === 0) {
        return <p>No expenses yet</p>;
    }

    return (
        <div>
            {expenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete}/>
            ))}
        </div>
        
    );
}
