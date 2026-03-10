import { generateMonthOptions } from "../../utils/generateMonthOptions";

export function DateFilter({
  dateRange,
  setDateRange,
  setFilterMode,
  setSelectedMonth
}) {
  const months = generateMonthOptions(12);

  return (
    <div className="dateFilter">

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
          setFilterMode("range");
          setDateRange(prev => ({ ...prev, end: e.target.value }));
        }}
      />

      <select
        onChange={(e) => {
          setFilterMode("month");
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
          setFilterMode("all");
          setDateRange({ start: "", end: "" });
          setSelectedMonth("");
        }}
      >
        Show all
      </button>

    </div>
  );
}