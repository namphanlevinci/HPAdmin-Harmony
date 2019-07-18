import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Questions_api } from '../api/questions'
import * as typeQuestions from "../../actions/business/types"

export function* getAll_Questions_Saga() {
    yield takeLatest(typeQuestions.getAll_Questions, function* () {
        try {
            const LogList = yield getAll_Questions_api();
            // console.log(NotiList)
            if (LogList !== null) {
                yield put({ type: typeQuestions.getAll_Questions_Success, payload: LogList});
            } else {
                yield put({ type: typeQuestions.getAll_Questions_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}