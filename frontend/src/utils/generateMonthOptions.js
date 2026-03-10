export function generateMonthOptions(count = 12) {
  const months = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const value = date.toISOString().slice(0, 7);

    const label = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric"
    });

    months.push({ value, label });
  }

  return months;
}