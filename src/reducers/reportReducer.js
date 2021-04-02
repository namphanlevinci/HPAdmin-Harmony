import * as types from "../constants/reportConstants";
import moment from "moment";

const viewReportMerchantReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.REPORT_MERCHANT_ID:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};

const setViewBatchDate = (
  state = {
    loading: false,
    from: moment().startOf("month").format("YYYY-MM-DD"),
    to: moment().endOf("month").format("YYYY-MM-DD"),
    range: "thisMonth",
    page: 0,
    row: 5,
  },
  { type, payload }
) => {
  switch (type) {
    case types.SET_BATCH_DATE:
      return {
        ...state,
        from: payload.from || state.from,
        to: payload?.to || state.to,
      };
    case types.SET_BATCH_RANGE:
      return { ...state, range: payload };
    case types.SET_BATCH_PAGE:
      return { ...state, page: payload };
    case types.SET_BATCH_ROW:
      return { ...state, row: payload };
    default:
      return state;
  }
};

export { viewReportMerchantReducer, setViewBatchDate };
