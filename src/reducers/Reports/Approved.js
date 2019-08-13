import * as types from "../../actions/static/types";

const initialState = {
  data: []
};

const Approved_Static = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.APPROVED_STATICS_SUCCESS:
      state.data = payload;
      return { ...state };
    case types.APPROVED_STATICS_ERROR:
      return state;
    default:
      return state;
  }
};

export default Approved_Static;
