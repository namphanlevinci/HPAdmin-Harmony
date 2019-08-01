import * as types from "../../actions/merchants/types";

const initialState = {
  Data: [],
  Error: null
};

const updateMerchant_Infor = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UpdateMerchant_Infor_Success:
      state.Data = payload;
      return { ...state };
    case types.UpdateMerchant_Infor_Error:
      state.Error = "Something went wrongs";
      return { ...state };
    default:
      return state;
  }
};

export default updateMerchant_Infor;
