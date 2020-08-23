import * as types from "../../actions/user/types";
import { store } from "react-notifications-component";
import axios from "axios";

const initialState = {
  User: JSON.parse(localStorage.getItem("User_login"))
    ? JSON.parse(localStorage.getItem("User_login"))
    : "",
  UserData: "",
  ViewUser: "",
  AddUser: "",
  VERIFY_NUMBER: "",
  UserRoleID: "",
  UserPermissions: [],
  Permissions: [],
  GettingPermissions: false,
  LoggedUser: "",
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      const { verifyCodeId, waRoleId } = payload;
      return { ...state, UserRoleID: waRoleId, VERIFY_NUMBER: verifyCodeId };

    case types.USER_LOGOUT:
      return { ...state };

    case types.VERIFY_USER:
      return { ...state, GettingPermissions: true };

    case types.VERIFY_SUCCESS:
      localStorage.setItem("User_login", JSON.stringify(payload));
      return { ...state, User: payload };

    case types.VERIFY_FAILURE:
      return { ...state, GettingPermissions: false };

    case types.VIEW_PROFILE_USER:
      return { ...state, ViewUser: payload };

    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, LoggedUser: payload };

    case types.GET_USER_BY_ID:
      return { ...state, UserData: payload };

    case types.GET_USER_BY_ID_SUCCESS:
      return { ...state, ViewUser: payload };

    case types.ADD_ADMIN_SUCCESS:
      return { ...state, AddUser: payload };

    case types.ADD_ADMIN_FAILURE:
      return { ...state };
    case types.GET_PERMISSION_BY_ID_SUCCESS:
      return { ...state, UserPermissions: payload };

    case types.GET_PERMISSION_ON_LOGIN_SUCCESS:
      return { ...state, UserPermissions: payload };

    case types.GET_ALL_PERMISSION_SUCCESS:
      return { ...state, Permissions: payload };

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
