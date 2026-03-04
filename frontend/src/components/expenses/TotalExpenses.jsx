import "./TotalExpenses.css";

export default function TotalExpenses({ total }) {
   return (
      <div className="center">
         <div className="totalExpenses">
            <h2>You have invested a total of:</h2>
            <h2 className="totalAmount">${total}</h2>
         </div>
      </div>
   );
}
