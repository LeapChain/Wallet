import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANK_TRANSACTIONS} from 'renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from 'renderer/utils/store';
import {BankTransaction, DictWithPaginatedResultsAndError} from 'shared/types';

const bankBankTransactions = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BankTransaction>,
  name: BANK_BANK_TRANSACTIONS,
  reducers: {
    setBankBankTransactions: setPaginatedResultReducer<BankTransaction>(),
    setBankBankTransactionsError: setPaginatedResultErrorReducer(),
    unsetBankBankTransactions: unsetDataReducer(),
  },
});

export const {setBankBankTransactions, setBankBankTransactionsError, unsetBankBankTransactions} =
  bankBankTransactions.actions;

export default bankBankTransactions.reducer;
