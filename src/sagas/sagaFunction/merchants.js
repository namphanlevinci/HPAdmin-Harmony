import { takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_MERCHANT_API,
  UPDATE_MERCHANT_API,
  GET_MERCHANT_BY_ID_API,
  GET_ALL_REJECTED_MERCHANT_API,
  GET_ALL_MERCHANT_REQUEST_API,
  APPROVE_MERCHANT_API,
  REJECT_MERCHANT_API,
  DELETE_MERCHANT_API,
} from "../api/merchants";
import { history } from "../../store/index";
import * as typeMerchant from "../../actions/merchants/types";

// GET ALL MERCHANTS
export function* GET_ALL_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.getAll_Merchants, function*(action) {
    const page = action.payload;
    try {
      const MerchantsList = yield GET_ALL_MERCHANT_API(page);
      // console.log(MerchantsList)
      if (MerchantsList !== null) {
        yield put({
          type: typeMerchant.getAll_Merchants_Success,
          payload: MerchantsList,
        });
      } else {
        yield put({
          type: typeMerchant.getAll_Merchants_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// UPDATE MERCHANT INFOR (GENERAL)
export function* UPDATE_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.UpdateMerchant_Infor, function*(action) {
    const data = action.payload;
    try {
      const UpdateInfor = yield UPDATE_MERCHANT_API(data);
      if (UpdateInfor !== null) {
        yield put({
          type: typeMerchant.UpdateMerchant_Infor_Success,
          payload: UpdateInfor,
        });
      } else {
        yield put({
          type: typeMerchant.UpdateMerchant_Infor_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// GET MERCHANT BY ID
export function* GET_MERCHANT_BY_ID_SAGA() {
  yield takeLatest(typeMerchant.GetMerchant_byID, function*(action) {
    const ID = action.payload;
    try {
      const getMerchant = yield GET_MERCHANT_BY_ID_API(ID);
      if (getMerchant !== null) {
        yield put({
          type: typeMerchant.GetMerchant_byID_Success,
          payload: getMerchant,
        });
      } else {
        yield put({
          type: typeMerchant.GetMerchant_byID_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
// GET REJECTED MERCHANTS
export function* GET_ALL_REJECTED_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.getAll_Rejected_Merchants, function*() {
    try {
      const MerchantRejected = yield GET_ALL_REJECTED_MERCHANT_API();
      if (MerchantRejected !== null) {
        yield put({
          type: typeMerchant.getAll_Rejected_Merchants_Success,
          payload: MerchantRejected,
        });
      } else {
        yield put({
          type: typeMerchant.getAll_Rejected_Merchants_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// GET ALL MERCHANT REQUEST
export function* GET_ALL_MERCHANT_REQUEST_SAGA() {
  yield takeLatest(typeMerchant.getAll_Merchant_Requests, function*() {
    try {
      const MerchantRequests = yield GET_ALL_MERCHANT_REQUEST_API();
      if (MerchantRequests !== null) {
        yield put({
          type: typeMerchant.getAll_Merchant_Requests_Success,
          payload: MerchantRequests,
        });
      } else {
        yield put({
          type: typeMerchant.getAll_Merchant_Requests_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
// SEND APPROVAL REQUEST
export function* MERCHANT_APPROVAL_SAGA() {
  yield takeLatest(typeMerchant.MERCHANT_APPROVAL, function*(action) {
    try {
      const data = action.payload;
      const Approval = yield APPROVE_MERCHANT_API(data);
      if (Approval !== null) {
        yield put({
          type: typeMerchant.MERCHANT_APPROVAL_SUCCESS,
          payload: Approval,
        });
      } else {
        yield put({
          type: typeMerchant.MERCHANT_APPROVAL_SUCCESS,
          payload: Approval,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// SEND REJECT REQUEST
export function* MERCHANT_REJECT_SAGA() {
  yield takeLatest(typeMerchant.MERCHANT_REJECT, function*(action) {
    try {
      const data = action.payload;
      const Approval = yield REJECT_MERCHANT_API(data);
      if (Approval !== null) {
        yield put({
          type: typeMerchant.MERCHANT_REJECT_SUCCESS,
          payload: Approval,
        });
      } else {
        yield put({
          type: typeMerchant.MERCHANT_REJECT_SUCCESS,
          payload: Approval,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// DELETE MERCHANT
export function* DELETE_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.DELETE_MERCHANT, function*(action) {
    const { ID, path } = action.payload;
    try {
      const result = yield DELETE_MERCHANT_API(ID);
      if (result !== null) {
        yield put({
          type: typeMerchant.DELETE_MERCHANT_SUCCESS,
          payload: result,
        });
        history.push(path);
      } else {
        yield put({
          type: typeMerchant.DELETE_MERCHANT_ERROR,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
