import { generateMonthOptions } from "../../utils/generateMonthOptions";
import "./DateFilter.css";

export function DateFilter({
  dateRange,
  setDateRange,
  setSelectedMonth,
  activeFilter,
  setActiveFilter,
  expenses,
  filteredExpenses
}) {
  const months = generateMonthOptions(12);

  return (
    <div className="dateFilter">
      <div className="quickFilters">

        <button
          className={`filterControl ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => {
            setActiveFilter("all");
            setDateRange({ start: "", end: "" });
            setSelectedMonth("");
          }}
        >
          All
        </button>

        <button
          className={`filterControl ${activeFilter === "thisMonth" ? "active" : ""}`}
          onClick={() => setActiveFilter("thisMonth")}
        >
          This Month
        </button>

        <button
          className={`filterControl ${activeFilter === "lastMonth" ? "active" : ""}`}
          onClick={() => setActiveFilter("lastMonth")}
        >
          Last Month
        </button>

        <button
          className={`filterControl ${activeFilter === "last3Months" ? "active" : ""}`}
          onClick={() => setActiveFilter("last3Months")}
        >
          Last 3 Months
        </button>

        <input
          className={`filterControl ${activeFilter === "rangeStart" ? "active" : ""}`}
          type="date"
          value={dateRange.start}
          onChange={(e) => {
            setActiveFilter("range");
            setDateRange(prev => ({ ...prev, start: e.target.value }));
          }}
        />

        <span>to</span>

        <input
          className={`filterControl ${activeFilter === "rangeEnd" ? "active" : ""}`}
          type="date"
          value={dateRange.end}
          onChange={(e) => {
            setActiveFilter("range");
            setDateRange(prev => ({ ...prev, end: e.target.value }));
          }}
        />

        <select className={`filterControl ${activeFilter === "month" ? "active" : ""}`}
          onChange={(e) => {
            setActiveFilter("month");
            setSelectedMonth(e.target.value);
          }}
        >
          <option value="">Select month</option>

          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <p className="filterInfo">
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </p>

    </div>
  );
}