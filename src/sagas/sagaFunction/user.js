import * as typeAgent from '../../actions/user/types'
import { login_Agent_api } from '../api/user'
import { takeLatest, put } from 'redux-saga/effects'

export function* login_Agent_Saga() {
    yield takeLatest(typeAgent.checkLogin_Agent, function* (action) {
        try {
            const { email, password } = action.payload
            const check = yield login_Agent_api({ email, password });
            console.log("CHECK", check.data)
            if (check.data.userAdmin) {
                // yield put({ type: typeAgent.checkLogin_Agent_Success, payload: check.data.userAdmin });
                yield put({ type: typeAgent.checkLogin_Agent_Success, payload: check.data });
            }
            if (check.error) {
                yield put({ type: typeAgent.checkLogin_Agent_Error, payload: check.error })
            }
        } catch (error) {
            yield put({ type: typeAgent.checkLogin_Agent_Error, payload: error })
        }
    })
}
