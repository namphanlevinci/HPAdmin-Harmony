import * as typeMerchants from "../../actions/merchants/types"

const initialState = []

const SearchMerchants = (state = initialState, action) => {
    switch (action.type) {
        case typeMerchants.SearchMerchants: 
            const { MerchantsList, email } = action.payload;
            if (email) {
                state = MerchantsList ? MerchantsList.filter((merchant, index) => {
                    return merchant.email.toLowerCase().indexOf(email.toLowerCase()) !== -1;
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