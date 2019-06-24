import { takeLatest, put } from 'redux-saga/effects';
import { getAll_Merchants_api } from '../api/merchants'
import * as typeMerchants from "../../actions/merchants/types"

export function* getAll_Merchants_Saga() {
    yield takeLatest(typeMerchants.getAll_Merchants, function* () {
        try {
            const MerchantsList = yield getAll_Merchants_api();
            // console.log(MerchantsList)
            if (MerchantsList !== null) {
                yield put({ type: typeMerchants.getAll_Merchants_Success, payload: MerchantsList});
            } else {
                yield put({ type: typeMerchants.getAll_Merchants_Error, payload: 'Something went wrong, please try again later!'})
            }
        } catch (error) {
            console.log(error)
        }
    })
}