import * as typeUser from "../../actions/user/types";

const initialState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  message_error: localStorage.getItem("Message"),
};

const UserLogin = (state = initialState, action) => {
  switch (action.type) {
    case typeUser.USER_LOGIN_SUCCESS:
      state.User = action.payload;
      localStorage.setItem("User_login", JSON.stringify(action.payload));
      window.location.href = "/verify";
      return { ...state };

    case typeUser.USER_LOGIN_FAILURE:
      localStorage.setItem("Message", action.payload);
      return { ...state };

    case typeUser.USER_LOGOUT:
      state.User = "";
      localStorage.removeItem("User_login");
      window.location.href = "/signin";
      return { ...state };
    default:
      return state;
  }
};
export default UserLogin;
