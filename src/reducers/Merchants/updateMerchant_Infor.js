import * as types from "../../actions/merchants/types";
import { store } from "react-notifications-component";

const initialState = {
  Data: [],
  Error: null,
};

const updateMerchant_Infor = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UpdateMerchant_Infor_Success:
      state.Data = payload;

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
    case types.UpdateMerchant_Infor_Error:
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
      state.Error = "Something went wrongs";
      return { ...state };
    default:
      return state;
  }
};

export default updateMerchant_Infor;
