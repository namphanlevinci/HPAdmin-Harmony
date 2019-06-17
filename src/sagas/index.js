import {fork} from 'redux-saga/effects'

import {login_Agent_Saga} from "../sagas/sagaFunction/user"

export default function* rootSaga(){
    yield fork(login_Agent_Saga);
}
