import * as typeMerchants from "../../actions/merchants/types";

const initialState = {};

const ViewProfile_Merchants = (state = initialState, action) => {
  switch (action.type) {
    case typeMerchants.ViewProfile_Merchants:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default ViewProfile_Merchants;
