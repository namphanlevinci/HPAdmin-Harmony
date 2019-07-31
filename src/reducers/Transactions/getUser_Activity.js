import * as Type from "../../actions/transactions/types";

const initialState = [];

const getUser_Activity = (state = initialState, { type, payload }) => {
  switch (type) {
    case Type.getUser_Activity_Success:
      state = payload;
      return [...state];
    case Type.getUser_Activity_Error:
      return state;
    default:
      return state;
  }
};

export default getUser_Activity;
