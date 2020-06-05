import * as typeUser from "../../actions/user/types";

const initialState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  message_error: localStorage.getItem("Message"),
};

const UserLogin = (state = initialState, action) => {
  switch (action.type) {
    case typeUser.checkLogin_User_Success:
      state.User = action.payload;
      localStorage.setItem("User_login", JSON.stringify(action.payload));
      window.location.href = "/verify";
      return { ...state };

    case typeUser.checkLogin_User_Error:
      localStorage.setItem("Message", action.payload);
      return { ...state };

    case typeUser.logout_User:
      state.User = "";
      localStorage.removeItem("User_login");
      window.location.href = "/signin";
      return { ...state };
    default:
      return state;
  }
};
export default UserLogin;
