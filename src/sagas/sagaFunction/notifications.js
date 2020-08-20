// import { takeLatest, put } from "redux-saga/effects";
// import { GET_ALL_NOTIFICATION_API } from "../api/notifications";
// import * as typeNoti from "../../actions/notifications/types";

// export function* GET_ALL_NOTIFICATION_SAGA() {
//   yield takeLatest(typeNoti.getAll_Notifications, function*() {
//     try {
//       const NotiList = yield GET_ALL_NOTIFICATION_API();
//       // console.log(NotiList)
//       if (NotiList !== null) {
//         yield put({
//           type: typeNoti.getAll_Notifications_Success,
//           payload: NotiList,
//         });
//       } else {
//         yield put({
//           type: typeNoti.getAll_Notifications_Error,
//           payload: "Something went wrong, please try again later!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }
