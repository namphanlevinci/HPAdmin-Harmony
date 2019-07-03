import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Logs_api } from '../api/logs'
import * as typeLog from "../../actions/Logs/types"

export function* getAll_Logs_Saga() {
    yield takeLatest(typeLog.getAll_Logs, function* () {
        try {
            const LogList = yield getAll_Logs_api();
            // console.log(NotiList)
            if (LogList !== null) {
                yield put({ type: typeLog.getAll_Logs_Success, payload: LogList});
            } else {
                yield put({ type: typeLog.getAll_Logs_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}