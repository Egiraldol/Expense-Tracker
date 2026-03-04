export const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value);
};