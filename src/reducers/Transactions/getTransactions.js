import * as typeTransactions from '../../actions/transactions/types'

const initialState = []

const getAll_Transactions = (state = initialState, action ) => {
    switch (action.type) {
        case typeTransactions.getAll_Transactions_Success:
            state = action.payload
            return [...state];
       default:
           return [...state];
    }
}

export default getAll_Transactions;