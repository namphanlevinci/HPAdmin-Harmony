import { takeLatest, put } from "redux-saga/effects";
import * as types from "../../actions/static/types";
import { GET_APPROVED_API } from "../api/reports";

//! GET APPROVED MERCHANT
export function* GET_APPROVED_SAGA() {
  yield takeLatest(types.APPROVED_STATICS, function*(action) {
    try {
      const APPROVED_LIST = yield GET_APPROVED_API(action.payload);
      if (APPROVED_LIST !== null) {
        yield put({
          type: types.APPROVED_STATICS_SUCCESS,
          payload: APPROVED_LIST
        });
      } else {
        yield put({
          type: types.APPROVED_STATICS_ERROR,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
