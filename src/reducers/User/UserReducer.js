import * as types from "../../actions/user/types";

const initialState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  VERIFY_FAILURE: localStorage.getItem("VERIFY_FAILURE"),
  CurrentUser: "",
};

const VIEW_PROFILE_USER = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.VERIFY_SUCCESS:
      state.User = payload;
      localStorage.setItem("User_login", JSON.stringify(payload));
      window.location.href = "/app/dashboard";
      return { ...state };
    case types.VERIFY_FAILURE:
      localStorage.setItem("VERIFY_FAILURE", "Verify code is not correct!");
      return { ...state };
    case types.VIEW_PROFILE_USER:
      state = payload;
      return { ...state };
    case types.GET_USER_BY_ID:
      state.CurrentUser = payload;
      return { ...state };
    default:
      return state;
  }
};

export default VIEW_PROFILE_USER;
