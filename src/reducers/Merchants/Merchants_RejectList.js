import * as typeMerchants from "../../actions/merchants/types"

const initialState = []

const Merchants_RejectedList = (state = initialState, action) => {
    switch(action.type) {
        case typeMerchants.getAll_Rejected_Merchants_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default Merchants_RejectedList;