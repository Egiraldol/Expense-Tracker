import "./TotalExpenses.css";

export default function TotalExpenses({ total }) {
   return (
      <div className="center">
         <div className="totalExpenses">
            <h2>Total: ${total}</h2>
         </div>
      </div>
   );
}
