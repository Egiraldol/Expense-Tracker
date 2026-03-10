import { generateMonthOptions } from "../../utils/generateMonthOptions";

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
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => {
            setActiveFilter("all");
            setDateRange({ start: "", end: "" });
            setSelectedMonth("");
          }}
        >
          All
        </button>

        <button
          className={activeFilter === "thisMonth" ? "active" : ""}
          onClick={() => setActiveFilter("thisMonth")}
        >
          This Month
        </button>

        <button
          className={activeFilter === "lastMonth" ? "active" : ""}
          onClick={() => setActiveFilter("lastMonth")}
        >
          Last Month
        </button>

        <button
          className={activeFilter === "last3Months" ? "active" : ""}
          onClick={() => setActiveFilter("last3Months")}
        >
          Last 3 Months
        </button>

      </div>

      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => {
          setFilterMode("range");
          setDateRange(prev => ({ ...prev, start: e.target.value }));
        }}
      />

      <span>to</span>

      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => {
          setActiveFilter("range");
          setDateRange(prev => ({ ...prev, end: e.target.value }));
        }}
      />

      <select
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

      <button
        onClick={() => {
          setActiveFilter("all");
          setDateRange({ start: "", end: "" });
          setSelectedMonth("");
        }}
      >
        Show all
      </button>

      <p className="filterInfo">
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </p>

    </div>
  );
}