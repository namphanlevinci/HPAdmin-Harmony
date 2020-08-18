import * as types from "../../actions/merchants/types";
import { store } from "react-notifications-component";
import { Redirect } from "react-router";

const initialState = {};

const MerchantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.DELETE_MERCHANT_SUCCESS:
      state = payload;
      store.addNotification({
        title: "SUCCESS!",
        message: "Success",
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

      return { ...state };

    case types.DELETE_MERCHANT_ERROR:
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

export default MerchantReducer;
