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
  console.log("payload", payload);
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      window.location.href = "/verify";
      const { verifyCodeId, waRoleId } = payload;
      return { ...state, UserRoleID: waRoleId, VERIFY_NUMBER: verifyCodeId };

    case types.USER_LOGIN_FAILURE:
      store.addNotification({
        title: "ERROR!",
        message: `${payload}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 250,
      });
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
      console.log("payload", payload);
      localStorage.setItem("User_login", JSON.stringify(payload));
      setTimeout(() => {
        window.location.href = "/app/merchants/list";
      }, 1000);
      return { ...state, User: payload };

    case types.VERIFY_FAILURE:
      store.addNotification({
        title: "ERROR!",
        message: `${payload}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 250,
      });
      return { ...state };
    case types.VIEW_PROFILE_USER:
      return { ...state, viewUser: payload };

    case types.GET_USER_BY_ID_SUCCESS:
      return { ...state, userByID: payload };

    case types.ADD_ADMIN_SUCCESS:
      store.addNotification({
        title: "SUCCESS!",
        message: `${payload}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 250,
      });
      window.location.href = "/app/accounts/admin";
      return { ...state, AddUser: payload };

    case types.ADD_ADMIN_FAILURE:
      store.addNotification({
        title: "ERROR!",
        message: "Something went wrong",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 250,
      });
      return { ...state };
    case types.GET_PERMISSION_BY_ID_SUCCESS:
      return { ...state, userModulePages: payload };

    case types.GET_ALL_PERMISSION_SUCCESS:
      return { ...state, allPermission: payload };

    case types.UPDATE_PERMISSIONS_SUCCESS:
      store.addNotification({
        title: "SUCCESS!",
        message: "Update Permissions Success",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 270,
      });

      return { ...state };
    case types.UPDATE_PERMISSIONS_FAILURE:
      store.addNotification({
        title: "ERROR!",
        message: `${payload}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 250,
      });
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
