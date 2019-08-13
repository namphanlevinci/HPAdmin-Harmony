import * as types from "../../actions/business/types";

const initialState = { message: "" };

const Update_Questions = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_QUESTIONS_SUCCESS:
      state.message = payload;
      return { ...state };
    case types.UPDATE_QUESTIONS_ERROR:
      return state;
    default:
      return state;
  }
};

export default Update_Questions;
