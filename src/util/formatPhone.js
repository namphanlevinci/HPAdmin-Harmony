const formatPhone = (Phone) => {
  if (Phone.startsWith("+1")) {
    return Phone.replace(/[{( )}]/g, "").replace(
      /(\d{1})\-?(\d{3})\-?(\d{3})\-?(\d{4})/,
      "$1 $2-$3-$4"
    );
  }
  if (Phone.startsWith("1")) {
    return Phone.replace(/[{( )}]/g, "").replace(
      /(\d{1})\-?(\d{3})\-?(\d{3})\-?(\d{4})/,
      "+$1 $2-$3-$4"
    );
  }
  if (Phone.startsWith("84"))
    return Phone.replace(/[{( )}]/g, "").replace(
      /(\d{2})\-?(\d{3})\-?(\d{3})\-?(\d{4})/,
      "+$1 $2-$3-$4"
    );
  if (Phone.startsWith("+84"))
    return Phone.replace(/[{( )}]/g, "").replace(
      /(\d{2})\-?(\d{3})\-?(\d{3})\-?(\d{4})/,
      "$1 $2-$3-$4"
    );
};

export default formatPhone;
