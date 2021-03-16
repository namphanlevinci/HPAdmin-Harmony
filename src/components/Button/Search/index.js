import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const NewButton = withStyles({
  root: {
    background: "#ffffff",
    borderRadius: 2,
    borderStyle: "solid",
    border: 1,
    borderColor: "#CCCCCC",
    color: "#707070",
    height: 36,
    width: 118,
  },
  label: {
    textTransform: "capitalize",
    fontSize: 17,
  },
})(Button);
export default NewButton;
