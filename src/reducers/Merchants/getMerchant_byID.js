import * as Types from "../../actions/merchants/types";

const initialState = {
  Data: []
};

const getMerchant_byID = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GetMerchant_byID_Success:
      state.Data = payload;
      return { ...state };
    default:
      return state;
  }
};

export default getMerchant_byID;
