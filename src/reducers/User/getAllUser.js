import * as typeUser from "../../actions/user/types";

const initialState = [];

const getAllUser = (state = initialState, action) => {
  switch (action.type) {
    case typeUser.GET_USER_SUCCESS:
      state = action.payload;
      return [...state];
    default:
      return [...state];
  }
};
export default getAllUser;
