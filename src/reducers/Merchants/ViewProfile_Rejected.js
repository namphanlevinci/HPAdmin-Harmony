import * as typeMerchants from "../../actions/merchants/types";

const initialState = {};

const ViewProfile_Rejected = (state = initialState, action) => {
  switch (action.type) {
    case typeMerchants.ViewMerchant_Rejected_Merchants:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default ViewProfile_Rejected;
