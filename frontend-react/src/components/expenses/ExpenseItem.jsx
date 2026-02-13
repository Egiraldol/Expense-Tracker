export default function ExpenseItem({ expense }) {
    return (
        <div>
            <p>{expense.amount}</p>
            <p>{expense.category}</p>
            <p>{expense.description}</p>
            <p>{expense.date}</p>
        </div>
    );
}