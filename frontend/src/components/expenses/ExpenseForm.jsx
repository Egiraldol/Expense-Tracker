import { useState } from "react";
import "./ExpenseForm.css"

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

        const today = new Date().toISOString().split("T")[0];
        const formattedData = {
            ...formData,
            amount: Number(formData.amount),
            date: formData.date || today
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
        <div className="center">
            <form onSubmit={handleSubmit} className="expenseForm">
                <h2 className="formTitle">Add new expense</h2>
                <div className="formGrid">
                    <div className="formGroup">
                        <input className="amount" type="number" step="100" min="0" id="amount" name="amount" value={formData.amount} placeholder="amount" required onChange={handleChange}></input>
                    </div>

                    <div className="formGroup">
                        <select className="category" type="text" id="category" name="category" value={formData.category} required onChange={handleChange}>
                            <option value="" disabled>Select category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Services">Services</option>
                            <option value="Health">Health</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>    

                    <div className="formGroup">    
                        <textarea className="description" type="text" id="description" name="description" value={formData.description} placeholder="description" onChange={handleChange}></textarea>
                    </div> 

                    <div className="formGroup">    
                        <input className="date" type="date" id="date" name="date" value={formData.date} placeholder="date" onChange={handleChange}></input>
                    </div> 
                
                    <div className="formGroup">    
                        <button className="btn-submit" id="submit" name="submit">Add expense</button>
                    </div>
                </div>
            </form>
        </div>

    );
}