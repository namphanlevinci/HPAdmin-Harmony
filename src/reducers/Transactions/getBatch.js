import * as typeBatch from "../../actions/transactions/types";
const initialState = [];

const getAllBatch = (state = initialState, action) => {
  switch (action.type) {
    case typeBatch.getBatch_Success:
      state = action.payload;
      return [...state];
    default:
      return state;
  }
};
export default getAllBatch;
