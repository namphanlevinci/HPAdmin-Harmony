import * as typeMerchants from "../../actions/merchants/types"

const initialState = {}

const ViewMerchant_Pending = (state = initialState, action) => {
    switch (action.type) {
        case typeMerchants.ViewMerchant_Request: 
            state = action.payload;
            return {...state}
        default:
            return {...state}
    }
}

export default ViewMerchant_Pending;