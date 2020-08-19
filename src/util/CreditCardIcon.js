import MasterCard from "../assets/images/mastercard.png";
import Visa from "../assets/images/visa.png";
import AmericanExpress from "../assets/images/americaexpress.png";
import Other from "../assets/images/other.png";

const CreditCardIcon = (type) => {
  switch (type) {
    case "Mastercard":
      return MasterCard;
    case "Visa":
      return Visa;
    case "Americaexpress":
      return AmericanExpress;
    default:
      return null;
  }
};

export default CreditCardIcon;
