import * as typeMerchants from "../../actions/merchants/types"

const initialState = []

const Merchants_List = (state = initialState, action) => {
    switch(action.type) {
        case typeMerchants.getAll_Merchants_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default Merchants_List;