import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        date: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formattedData = {
            ...formData,
            amount: Number(formData.amount)
        };

        onAddExpense(formattedData);

        setFormData({
            amount: "",
            category: "",
            description: "",
            date: ""
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>New expense</h4>
            <input type="number" id="amount" name="amount" value={formData.amount} placeholder="amount" required onChange={handleChange}></input>
            <select type="text" id="category" name="category" value={formData.category} required onChange={handleChange}>
                <option value="" disabled>Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Services">Services</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
            </select>
            <textarea type="text" id="description" name="description" value={formData.description} placeholder="description" onChange={handleChange}></textarea>
            <input type="date" id="date" name="date" value={formData.date} placeholder="date" required onChange={handleChange}></input>
            <button className="btn-submit" id="submit" name="submit">Submit</button>
        </form>
    );
}