import * as types from "../../actions/merchants/types";

const initialState = [];
const Approval = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.MERCHANT_APPROVAL_SUCCESS:
      state = payload;
      return { ...state };
    case types.MERCHANT_APPROVAL_ERROR:
      state.Error = payload;
      return { ...state };
    default:
      return state;
  }
};

export default Approval;
