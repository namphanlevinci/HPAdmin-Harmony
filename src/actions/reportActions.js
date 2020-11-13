import * as types from "../constants/reportConstants";

export const getReportMerchantId = (id) => async (dispatch) => {
  dispatch({
    type: types.REPORT_MERCHANT_ID,
    payload: id,
  });
};
