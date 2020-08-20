import * as types from "../../actions/user/types";
import { store } from "react-notifications-component";
import axios from "axios";

const initialState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  userByID: "",
  viewUser: "",
  AddUser: "",
  VERIFY_NUMBER: "",
  UserRoleID: "",
  userModulePages: [],
  allPermission: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      window.location.href = "/verify";
      const { verifyCodeId, waRoleId } = payload;
      return { ...state, UserRoleID: waRoleId, VERIFY_NUMBER: verifyCodeId };

    case types.USER_LOGIN_FAILURE:
      return { ...state };

    case types.USER_LOGOUT:
      const ID = payload;
      const token = JSON.parse(localStorage.getItem("User_login"));
      const config = {
        headers: { Authorization: "bearer " + token.token },
      };

      axios
        .put(`${URL}/adminUser/logout/${ID}`, null, config)
        .then((res) => console.log("res", res));

      localStorage.removeItem("User_login");
      window.location.href = "/signin";
      return { ...state };

    case types.VERIFY_SUCCESS:
      localStorage.setItem("User_login", JSON.stringify(payload));

      return { ...state, User: payload };

    case types.VERIFY_FAILURE:
      return { ...state };
    case types.VIEW_PROFILE_USER:
      return { ...state, viewUser: payload };

    case types.GET_USER_BY_ID:
      return { ...state, userByID: payload };

    case types.ADD_ADMIN_SUCCESS:
      return { ...state, AddUser: payload };

    case types.ADD_ADMIN_FAILURE:
      return { ...state };
    case types.GET_PERMISSION_BY_ID_SUCCESS:
      return { ...state, userModulePages: payload };

    case types.GET_ALL_PERMISSION_SUCCESS:
      return { ...state, allPermission: payload };

    case types.UPDATE_PERMISSIONS_SUCCESS:
      return { ...state };
    case types.UPDATE_PERMISSIONS_FAILURE:
      return { ...state };

    case types.UPDATE_USER_ADMIN:
      return { ...state };
    case types.UPDATE_USER_PASSWORD:
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
