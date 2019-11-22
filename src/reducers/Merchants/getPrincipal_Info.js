import * as typeMerchants from "../../actions/merchants/types";

const initialState = {};

const viewPrincipalInfo = (state = initialState, action) => {
  switch (action.type) {
    case typeMerchants.UPDATE_PRINCIPAL:
      state = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default viewPrincipalInfo;
