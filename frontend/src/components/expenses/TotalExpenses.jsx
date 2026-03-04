import "./TotalExpenses.css";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TotalExpenses({ total }) {
   return (
      <div className="center">
         <div className="totalExpenses">
            <h2>You have invested a total of:</h2>
            <h2 className="totalAmount">{formatCurrency(total)}</h2>
         </div>
      </div>
   );
}
