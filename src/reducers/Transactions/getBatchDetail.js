import * as typeBatch from "../../actions/transactions/types";

const initialState = [];

const getBatchDetail = (state = initialState, action) => {
  switch (action.type) {
    case typeBatch.getBatchDetail_Success:
      state = action.payload;
      return [...state];
    default:
      return [...state];
  }
};

export default getBatchDetail;
