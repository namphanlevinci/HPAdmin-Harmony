import * as typeMerchants from "../../actions/merchant-requests/types"

const initialState = []

const MerchantRequests_List = (state = initialState, action) => {
    switch(action.type) {
        case typeMerchants.getAll_Merchant_Requests_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default MerchantRequests_List;