import * as types from "../../actions/user/types";
import { store } from "react-notifications-component";
import axios from "axios";

const initialState = [
  {
    User: JSON.parse(localStorage.getItem("User_login"))
      ? JSON.parse(localStorage.getItem("User_login"))
      : "",
    VERIFY_FAILURE: localStorage.getItem("VERIFY_FAILURE"),
    userByID: "",
    viewUser: "",
    AddUser: "",
  },
];

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
      state.User = payload;
      localStorage.setItem("User_login", JSON.stringify(payload));
      window.location.href = "/verify";
      return { ...state };

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
      state.User = payload;
      localStorage.setItem("User_login", JSON.stringify(payload));
      window.location.href = "/app/merchants/list";
      return { ...state };
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
      state.viewUser = payload;
      return { ...state };
    case types.GET_USER_BY_ID_SUCCESS:
      state.userByID = payload;
      return { ...state };
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
      state.AddUser = payload;
      window.location.href = "/app/accounts/admin";
      return { ...state };

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
    default:
      return state;
  }
};

export default userReducer;
