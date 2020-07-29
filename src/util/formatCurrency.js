export default function formatCurrency(amount) {
  console.log("amount", amount);
  const format = new Intl.NumberFormat("en-US", amount);

  console.log("format", format);

  return format;
}
