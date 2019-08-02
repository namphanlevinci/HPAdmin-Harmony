import * as types from "../../actions/merchants/types";

const initalState = [];

const Reject = (state = initalState, { type, payload }) => {
  switch (type) {
    case types.MERCHANT_REJECT_SUCCESS:
      state = payload;
      return { ...state };
    default:
      return state;
  }
};
export default Reject;
