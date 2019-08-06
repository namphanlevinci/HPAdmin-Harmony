import * as types from "../../actions/user/types";

const initalState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  verify_error: localStorage.getItem("VERIFY_ERROR")
};

const Verify = (state = initalState, action) => {
  switch (action.type) {
    case types.Verify_Success:
      state.User = action.payload;
      localStorage.setItem("User_login", JSON.stringify(action.payload));
      window.location.href = "/app/dashboard";
      return { ...state };
    case types.Verify_Error:
      localStorage.setItem("VERIFY_ERROR", "Verify code is not correct!");
      return { ...state };
    default:
      return state;
  }
};
export default Verify;
