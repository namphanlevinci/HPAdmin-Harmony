import * as typeMerchantRequest from "../../actions/merchant-requests/types"

const initialState = []

const SearchMerchant_Request = (state = initialState, action) => {
    switch (action.type) {
        case typeMerchantRequest.SearchMerchant_Request: 
            const { MerchantsList, businessName } = action.payload;
            if (businessName) {
                state = MerchantsList ? MerchantsList.filter((merchant, index) => {
                    return merchant.businessName.toLowerCase().indexOf(businessName.toLowerCase()) !== -1;
                }) : []
            } else {
                state = []
            }
            return [...state]
        default:
            return [...state]
    }
}

export default SearchMerchant_Request;