const formatSSN = (SSN) => {
  return SSN?.replace(/[{( )}]/g, "").replace(
    /[1-9]/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "$3-$2-$4"
  );
};

console.log("formatSSN", formatSSN);
export default formatSSN;
