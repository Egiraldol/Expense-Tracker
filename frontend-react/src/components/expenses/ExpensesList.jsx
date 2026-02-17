import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({
    expenses,
    editingId,
    onDelete,
    onEdit,
    onCancel,
    onUpdate
}) {
    return (
        <>
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
        </>
    );
}
