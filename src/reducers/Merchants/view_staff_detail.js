import * as typeMerchants from "../../actions/merchants/types";

const initialState = {};

const VIEW_STAFF_DETAIL = (state = initialState, action) => {
  switch (action.type) {
    case typeMerchants.VIEW_STAFF:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default VIEW_STAFF_DETAIL;
