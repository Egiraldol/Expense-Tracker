import { useState, useEffect } from "react";
import "./ExpenseItem.css"
import { formatCurrency } from "../../utils/formatCurrency";

export default function ExpenseItem({ 
    expense, 
    onDelete, 
    isEditing, 
    onEdit, 
    onCancel, 
    onUpdate 
}) {
    const [formData, setFormData] = useState(getExpenseData(expense));

    function getExpenseData(expense) {
        return {
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: expense.date
        };
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        if (isEditing) {
            setFormData(getExpenseData(expense));
        }
    }, [isEditing, expense]);

    if (isEditing) {
        return (
            <div className="center">
                <div className={`expenseItem ${isEditing ? "editing" : ""}`}>
                    <input type="number" step="100" min="0" id="amount" name="amount" value={formData.amount} onChange={handleChange}></input>
                    <select type="text" id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value="" disabled>Select category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Services">Services</option>
                        <option value="Health">Health</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea type="text" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}></input>
                    
                    <div className="expenseActions">
                        <button onClick={() => onUpdate(expense.id, formData)}>
                            <i className="fa-regular fa-circle-check"></i>
                        </button>

                        <button onClick={() => onCancel()}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="center">
            <div className="expenseItem">
                <p id="amount">{formatCurrency(expense.amount)}</p>
                <p id="category">{expense.category}</p>
                <p id="description">{expense.description}</p>
                <p id="date">{expense.date}</p>
                
                <div className="expenseActions">
                    <button onClick={() => onEdit(expense.id)}>
                        <i className="fa-solid fa-pen"></i>
                    </button>

                    <button onClick={() => onDelete(expense.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}