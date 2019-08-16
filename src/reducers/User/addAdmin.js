import * as typeUser from "../../actions/user/types";

const initialState = {
  message: localStorage.getItem("ADD_STATUS")
};

const addAdminUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeUser.ADD_ADMIN_SUCCESS:
      state.message = payload;
      localStorage.setItem("ADD_STATUS", payload);
      return state;
    default:
      return state;
  }
};

export default addAdminUser;
