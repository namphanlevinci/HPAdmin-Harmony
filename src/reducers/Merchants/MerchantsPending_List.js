import * as typeMerchants from "../../actions/merchants/types"

const initialState = []

const MerchantsPending_List = (state = initialState, action) => {
    switch(action.type) {
        case typeMerchants.getAll_Merchant_Requests_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default MerchantsPending_List;