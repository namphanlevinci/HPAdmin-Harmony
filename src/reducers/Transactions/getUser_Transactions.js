import * as Type from "../../actions/transactions/types";

const initialState = [];

const getUser_Transaction = (state = initialState, { type, payload }) => {
  switch (type) {
    case Type.getUser_Transaction_Success:
      state = payload;
      return [...state];
    default:
      return state;
  }
};

export default getUser_Transaction;
