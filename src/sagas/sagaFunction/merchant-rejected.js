import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Rejected_Merchant_api } from '../api/merchant-rejected'
import * as typeMerchant from "../../actions/merchants/types"

export function* getAll_Rejected_Merchant_Saga() {
    yield takeLatest(typeMerchant.getAll_Rejected_Merchants, function* () {
        try {
            const MerchantRejected = yield getAll_Rejected_Merchant_api();
            if (MerchantRejected !== null) {
                yield put({ type: typeMerchant.getAll_Rejected_Merchants_Success, payload: MerchantRejected});
            } else {
                yield put({ type: typeMerchant.getAll_Rejected_Merchants_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}