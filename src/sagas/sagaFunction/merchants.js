import { takeLatest, put } from "redux-saga/effects";
import {
  // GET_ALL_MERCHANT_API,
  UPDATE_MERCHANT_API,
  GET_MERCHANT_BY_ID_API,
  GET_ALL_REJECTED_MERCHANT_API,
  GET_ALL_MERCHANT_REQUEST_API,
  APPROVE_MERCHANT_API,
  REJECT_MERCHANT_API,
  DELETE_MERCHANT_API,
  ARCHIVE_MERCHANT_API,
  RESTORE_MERCHANT_API,
  SET_PENDING_STATUS_API,
} from "../api/merchants";
import { history } from "../../store/index";
import * as typeMerchant from "../../actions/merchants/types";
import * as typeNotification from "../../actions/notifications/types";

// GET ALL MERCHANTS
// export function* GET_ALL_MERCHANT_SAGA() {
//   yield takeLatest(typeMerchant.getAll_Merchants, function*(action) {
//     const page = action.payload;
//     try {
//       const MerchantsList = yield GET_ALL_MERCHANT_API(page);
//       // console.log(MerchantsList)
//       if (MerchantsList !== null) {
//         yield put({
//           type: typeMerchant.getAll_Merchants_Success,
//           payload: MerchantsList,
//         });
//       } else {
//         yield put({
//           type: typeMerchant.getAll_Merchants_Error,
//           payload: "Something went wrong, please try again later!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

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
  yield takeLatest(typeMerchant.GET_MERCHANT_BY_ID, function*(action) {
    const { ID, path } = action.payload;

    try {
      const getMerchant = yield GET_MERCHANT_BY_ID_API(ID);
      if (getMerchant !== null) {
        yield put({
          type: typeMerchant.GET_MERCHANT_BY_ID_SUCCESS,
          payload: getMerchant,
        });
        if (path) {
          history.push(path);
        }
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
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
      const result = yield APPROVE_MERCHANT_API(data);
      if (Number(result.codeNumber) === 200) {
        yield put({
          type: typeMerchant.MERCHANT_APPROVAL_SUCCESS,
          payload: result,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });
        history.push("/app/merchants/pending");
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: result.message,
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
      const result = yield REJECT_MERCHANT_API(data);
      if (result !== null) {
        yield put({
          type: typeMerchant.MERCHANT_REJECT_SUCCESS,
          payload: result,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });
        history.push("/app/merchants/pending");
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: result.message,
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
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });

        history.push(path);
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// ARCHIVE MERCHANT
export function* ARCHIVE_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.ARCHIVE_MERCHANT, function*(action) {
    try {
      const result = yield ARCHIVE_MERCHANT_API(action.payload);
      console.log("action.payload", action.payload);
      if (result !== null) {
        yield put({
          type: typeMerchant.GET_MERCHANT_BY_ID,
          payload: action.payload.ID,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// ARCHIVE MERCHANT
export function* RESTORE_MERCHANT_SAGA() {
  yield takeLatest(typeMerchant.RESTORE_MERCHANT, function*(action) {
    try {
      const result = yield RESTORE_MERCHANT_API(action.payload);
      console.log("result", result);
      if (result.message === "Success") {
        yield put({
          type: typeMerchant.GET_MERCHANT_BY_ID,
          payload: action.payload,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// Handle set status pending merchant
export function* SET_PENDING_STATUS_SAGA() {
  yield takeLatest(typeMerchant.SET_PENDING_STATUS, function*(action) {
    try {
      const result = yield SET_PENDING_STATUS_API(action.payload);
      if (result.message === "Success") {
        yield put({
          type: typeMerchant.SET_PENDING_STATUS_SUCCESS,
          payload: action.payload,
        });
        yield put({
          type: typeMerchant.GET_MERCHANT_BY_ID,
          payload: action.payload,
        });
      } else {
        yield put({
          type: typeMerchant.SET_PENDING_STATUS_FAILURE,
          payload: action.payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
