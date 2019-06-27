import * as typeMerchantRequest from "../../actions/merchant-requests/types"

const initialState = {}

const ViewMerchant_Request = (state = initialState, action) => {
    switch (action.type) {
        case typeMerchantRequest.ViewMerchant_Request: 
            state = action.payload;
            return {...state}
        default:
            return {...state}
    }
}

export default ViewMerchant_Request;