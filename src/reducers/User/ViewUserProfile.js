import * as typeUser from "../../actions/user/types";

const initialState = {};

const ViewProfile_User = (state = initialState, action) => {
  switch (action.type) {
    case typeUser.ViewProfile_User:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default ViewProfile_User;
