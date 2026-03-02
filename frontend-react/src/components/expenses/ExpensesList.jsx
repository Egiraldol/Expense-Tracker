import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

export default function ExpenseList({
    expenses,
    editingId,
    onDelete,
    onEdit,
    onCancel,
    onUpdate
}) {
    return (
        <div className="center">
            <div className="expenseList">
                <h2>Expenses</h2>
                {expenses.map(expense => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        isEditing={expense.id === editingId}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onCancel={onCancel}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
}
