import * as types from "../constants/reportConstants";

export const getReportMerchantId = (id) => async (dispatch) => {
  dispatch({
    type: types.REPORT_MERCHANT_ID,
    payload: id,
  });
};
export const setBatchDate = (payload) => async (dispatch) => {
  dispatch({ type: types.SET_BATCH_DATE, payload });
};

export const setBatchRange = (payload) => async (dispatch) => {
  dispatch({ type: types.SET_BATCH_RANGE, payload });
};
export const setBatchPage = (page) => async (dispatch) => {
  dispatch({ type: types.SET_BATCH_PAGE, payload: page });
};

export const setBatchRow = (row) => async (dispatch) => {
  dispatch({ type: types.SET_BATCH_ROW, payload: row });
};
