import * as typeMerchants from "../../actions/merchants/types"

const initialState = []

const SearchMerchants = (state = initialState, action) => {
    switch (action.type) {
        case typeMerchants.SearchMerchants: 
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

export default SearchMerchants;