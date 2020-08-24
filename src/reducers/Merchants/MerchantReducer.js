import * as types from "../../actions/merchants/types";

const initialState = {
  MerchantData: "",
};

const MerchantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.DELETE_MERCHANT_SUCCESS:
      state = payload;
      return { ...state };
    case types.GET_MERCHANT_BY_ID_SUCCESS:
      state.MerchantData = payload;
      return { ...state };

    default:
      return state;
  }
};

export default MerchantReducer;
