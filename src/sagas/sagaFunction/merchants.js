import { takeLatest, put } from "redux-saga/effects";
import {
  getAll_Merchants_api,
  updateMerchant_Infor_api,
  getMerchant_byID_api
} from "../api/merchants";
import * as typeMerchants from "../../actions/merchants/types";

//! GET ALL MERCHANTS
export function* getAll_Merchants_Saga() {
  yield takeLatest(typeMerchants.getAll_Merchants, function*(action) {
    const page = action.payload;
    try {
      const MerchantsList = yield getAll_Merchants_api(page);
      // console.log(MerchantsList)
      if (MerchantsList !== null) {
        yield put({
          type: typeMerchants.getAll_Merchants_Success,
          payload: MerchantsList
        });
      } else {
        yield put({
          type: typeMerchants.getAll_Merchants_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! UPDATE MERCHANT INFOR (GENERAL)
export function* UpdateMerchant_Infor_Saga() {
  yield takeLatest(typeMerchants.UpdateMerchant_Infor, function*(action) {
    const data = action.payload;
    try {
      const UpdateInfor = yield updateMerchant_Infor_api(data);
      if (UpdateInfor !== null) {
        yield put({
          type: typeMerchants.UpdateMerchant_Infor_Success,
          payload: UpdateInfor
        });
      } else {
        yield put({
          type: typeMerchants.UpdateMerchant_Infor_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! GET MERCHANT BY ID
export function* getMerchant_byID_Saga() {
  yield takeLatest(typeMerchants.GetMerchant_byID, function*(action) {
    const ID = action.payload;
    try {
      const getMerchant = yield getMerchant_byID_api(ID);
      if (getMerchant !== null) {
        yield put({
          type: typeMerchants.GetMerchant_byID_Success,
          payload: getMerchant
        });
      } else {
        yield put({
          type: typeMerchants.GetMerchant_byID_Error,
          payload: "Something went wrong, please try again later!"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
