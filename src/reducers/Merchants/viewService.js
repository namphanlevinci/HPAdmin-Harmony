import * as typeMerchants from "../../actions/merchants/types";

const initialState = {};

const VIEW_SERVICE_EDIT = (state = initialState, action) => {
  switch (action.type) {
    // >>>>>???????
    case typeMerchants.VIEW_SERVICE:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default VIEW_SERVICE_EDIT;
