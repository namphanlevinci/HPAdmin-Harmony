import { takeLatest, put } from "redux-saga/effects";
import {
  getAll_Merchant_Requests_api,
  Send_Approval_api,
  Send_Reject_api
} from "../api/merchant-requests";
import * as typeMerchantRequests from "../../actions/merchants/types";

//! GET ALL MERCHANT REQUEST
export function* getAll_Merchant_Request_Saga() {
  yield takeLatest(typeMerchantRequests.getAll_Merchant_Requests, function*() {
    try {
      const MerchantRequests = yield getAll_Merchant_Requests_api();
      if (MerchantRequests !== null) {
        yield put({
          type: typeMerchantRequests.getAll_Merchant_Requests_Success,
          payload: MerchantRequests
        });
      } else {
        yield put({
          type: typeMerchantRequests.getAll_Merchant_Requests_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
//! SEND APPROVAL REQUEST
export function* Send_Approval_Saga() {
  yield takeLatest(typeMerchantRequests.MERCHANT_APPROVAL, function*(action) {
    try {
      const data = action.payload;
      const Approval = yield Send_Approval_api(data);
      if (Approval !== null) {
        yield put({
          type: typeMerchantRequests.MERCHANT_APPROVAL_SUCCESS,
          payload: Approval
        });
      } else {
        yield put({
          type: typeMerchantRequests.MERCHANT_APPROVAL_SUCCESS,
          payload: Approval
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! SEND REJECT REQUEST
export function* Send_Reject_Saga() {
  yield takeLatest(typeMerchantRequests.MERCHANT_REJECT, function*(action) {
    try {
      const data = action.payload;
      const Approval = yield Send_Reject_api(data);
      if (Approval !== null) {
        yield put({
          type: typeMerchantRequests.MERCHANT_REJECT_SUCCESS,
          payload: Approval
        });
      } else {
        yield put({
          type: typeMerchantRequests.MERCHANT_REJECT_SUCCESS,
          payload: Approval
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
