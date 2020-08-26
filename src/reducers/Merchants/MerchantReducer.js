import * as types from "../../actions/merchants/types";

const initialState = {
  MerchantData: "",
  setPendingStatus: "",
  PrincipalData: "",
  ServiceData: "",
  ExtraData: "",
};

const MerchantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.DELETE_MERCHANT_SUCCESS:
      state = payload;
      return { ...state };
    case types.GET_MERCHANT_BY_ID_SUCCESS:
      state.MerchantData = payload;
      return { ...state };
    case types.SET_PENDING_STATUS_SUCCESS:
      state.setPendingStatus = payload;
      return { ...state };
    case types.VIEW_PRINCIPAL:
      state.PrincipalData = payload;
      return { ...state };
    case types.VIEW_SERVICE:
      state.ServiceData = payload;
      return { ...state };
    case types.GET_MERCHANT_EXTRA_SUCCESS:
      state.ExtraData = payload;
      return { ...state };
    default:
      return state;
  }
};

export default MerchantReducer;