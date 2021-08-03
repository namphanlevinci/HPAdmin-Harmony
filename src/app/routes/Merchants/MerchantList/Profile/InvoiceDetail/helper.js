export const FormatPrice = (price) => {
    const checkPrice = price ? price + "" : "0";
    const formatPrice = checkPrice.replace(",", "");
    return parseFloat(formatPrice);
  };
  
  export const formatNumberFromCurrency = (currency) => {
    return Number(`${currency}`.replace(/[^0-9.-]+/g, ""));
  };
  
  export const formatMoney = (
    number,
    decimalCount = 2,
    decimal = ".",
    thousands = ","
  ) => {
    let amount = formatNumberFromCurrency(number);
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;
  
      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {}
  };
  