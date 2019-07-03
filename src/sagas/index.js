import {fork} from 'redux-saga/effects'

import {login_User_Saga, getAll_User_Saga} from "../sagas/sagaFunction/user"

import {getAll_Merchants_Saga} from "../sagas/sagaFunction/merchants"
import {getAll_Merchant_Request_Saga} from "../sagas/sagaFunction/merchant-requests.js"
import {getAll_Notifications_Saga} from "../sagas/sagaFunction/notifications"

export default function* rootSaga(){
    yield fork(login_User_Saga);
    yield fork(getAll_Merchants_Saga);
    yield fork(getAll_Merchant_Request_Saga);
    yield fork(getAll_User_Saga);
    yield fork(getAll_Notifications_Saga);
}
