import * as typeTransactions from "../../actions/transactions/types";

const initialState = [];

const getAllP2P_Transactions = (state = initialState, action) => {
  switch (action.type) {
    case typeTransactions.getP2P_Transactions_Success:
      state = action.payload;
      return [...state];
    default:
      return [...state];
  }
};

export default getAllP2P_Transactions;
