export default function ExpenseItem({ expense, onDelete }) {
    return (
        <div>
            <p>{expense.amount}</p>
            <p>{expense.category}</p>
            <p>{expense.description}</p>
            <p>{expense.date}</p>

            <button onClick={() => onDelete(expense.id)}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
}