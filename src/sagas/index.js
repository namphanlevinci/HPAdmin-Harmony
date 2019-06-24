import {fork} from 'redux-saga/effects'

import {login_Agent_Saga} from "../sagas/sagaFunction/user"
import {getAll_Merchants_Saga} from "../sagas/sagaFunction/merchants"
import {getAll_Merchant_Request_Saga} from "../sagas/sagaFunction/merchant-requests.js"

export default function* rootSaga(){
    yield fork(login_Agent_Saga);
    yield fork(getAll_Merchants_Saga);
    yield fork(getAll_Merchant_Request_Saga);
}
