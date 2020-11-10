import * as types from "../constants/reportConstants";

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

export { viewReportMerchantReducer };
