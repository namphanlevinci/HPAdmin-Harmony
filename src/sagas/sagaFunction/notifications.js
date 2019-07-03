import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Notifications_api } from '../api/notifications'
import * as typeNoti from "../../actions/notifications/types"

export function* getAll_Notifications_Saga() {
    yield takeLatest(typeNoti.getAll_Notifications, function* () {
        try {
            const NotiList = yield getAll_Notifications_api();
            // console.log(NotiList)
            if (NotiList !== null) {
                yield put({ type: typeNoti.getAll_Notifications_Success, payload: NotiList});
            } else {
                yield put({ type: typeNoti.getAll_Notifications_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}