import { takeLatest, put } from "redux-saga/effects";
import { GET_LOG_API } from "../api/logs";
import * as typeLog from "../../actions/Logs/types";

export function* GET_ALL_LOG_SAGA() {
  yield takeLatest(typeLog.getAll_Logs, function*() {
    try {
      const LogList = yield GET_LOG_API();
      if (LogList !== null) {
        yield put({ type: typeLog.getAll_Logs_Success, payload: LogList });
      } else {
        yield put({
          type: typeLog.getAll_Logs_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
