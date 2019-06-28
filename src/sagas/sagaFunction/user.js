import * as typeUser from '../../actions/user/types'
import { login_User_api, getAll_User_api } from '../api/user'
import { takeLatest, put } from 'redux-saga/effects'

export function* login_User_Saga() {
    yield takeLatest(typeUser.checkLogin_User, function* (action) {
        try {
            const { email, password } = action.payload
            const check = yield login_User_api({ email, password });
            if (check.data !== null) {
                yield put({ type: typeUser.checkLogin_User_Success, payload: check.data });
            }
            if (check.data === null) {
                yield put({ type: typeUser.checkLogin_User_Error, payload: check.message })
            }
        } catch (error) {
            yield put({ type: typeUser.checkLogin_User_Error, payload: error })
        }
    })
}

export function* getAll_User_Saga() {
    yield takeLatest(typeUser.getAll_User, function* () {
        try {
            const UserList = yield getAll_User_api();
            if (UserList.data !== null) {
                yield put({ type: typeUser.getAll_User_Success, payload: UserList });
            } else {
                yield put({ type: typeUser.getAll_User_Error, payload: 'Something went wrong, please try again later!' })
            }
        } catch (error) {
            console.log(error);
        }
    });
}