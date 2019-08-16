import { fork } from "redux-saga/effects";
import {
  login_User_Saga,
  getAll_User_Saga,
  Verify_User_Saga,
  add_Admin_Saga
} from "../sagas/sagaFunction/user";
import {
  getAll_Merchants_Saga,
  UpdateMerchant_Infor_Saga,
  getMerchant_byID_Saga
} from "../sagas/sagaFunction/merchants";
import {
  getAll_Merchant_Request_Saga,
  Send_Approval_Saga,
  Send_Reject_Saga
} from "../sagas/sagaFunction/merchant-requests.js";
import { getAll_Notifications_Saga } from "../sagas/sagaFunction/notifications";
import { getAll_Logs_Saga } from "../sagas/sagaFunction/logs";
import { getAll_Rejected_Merchant_Saga } from "../sagas/sagaFunction/merchant-rejected";
import {
  getAll_Questions_Saga,
  update_Questions_Saga,
  getAll_ConsumerUsers_Saga
} from "./sagaFunction/questions";
import {
  getAll_Transactions_Saga,
  getUser_Transaction_Saga,
  getUser_Activity_Saga
} from "./sagaFunction/transactions";
import { GET_APPROVED_SAGA } from "./sagaFunction/reports";
export default function* rootSaga() {
  yield fork(login_User_Saga);
  yield fork(getAll_Merchants_Saga);
  yield fork(getAll_Merchant_Request_Saga);
  yield fork(getAll_User_Saga);
  yield fork(getAll_Notifications_Saga);
  yield fork(getAll_Logs_Saga);
  yield fork(getAll_Rejected_Merchant_Saga);
  yield fork(getAll_Questions_Saga);
  yield fork(getAll_Transactions_Saga);
  yield fork(getAll_ConsumerUsers_Saga);
  yield fork(getUser_Transaction_Saga);
  yield fork(getUser_Activity_Saga);
  yield fork(UpdateMerchant_Infor_Saga);
  yield fork(getMerchant_byID_Saga);
  yield fork(Send_Approval_Saga);
  yield fork(Send_Reject_Saga);
  yield fork(Verify_User_Saga);
  yield fork(update_Questions_Saga);
  yield fork(GET_APPROVED_SAGA);
  yield fork(add_Admin_Saga);
}
