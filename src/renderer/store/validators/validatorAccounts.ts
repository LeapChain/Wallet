import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_ACCOUNTS} from 'renderer/constants/actions';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from 'renderer/utils/store';
import {DictWithPaginatedResultsAndError, ValidatorAccount} from 'shared/types';

const validatorAccounts = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<ValidatorAccount>,
  name: VALIDATOR_ACCOUNTS,
  reducers: {
    setValidatorAccounts: setPaginatedResultReducer<ValidatorAccount>(),
    setValidatorAccountsError: setPaginatedResultErrorReducer(),
    unsetValidatorAccounts: unsetDataReducer(),
  },
});

export const {setValidatorAccounts, setValidatorAccountsError, unsetValidatorAccounts} = validatorAccounts.actions;

export default validatorAccounts.reducer;
