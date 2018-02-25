import * as actionTypes from './types';


export const setWallet = ({ wallet, rsaKey, account = 0 }) => ({
  type: actionTypes.SET_WALLET,
  payload: {
    wallet,
    account,
    rsaKey,
  },
});

export const clearWallet = () => ({
  type: actionTypes.CLEAR_WALLET,
});

export const selectAccount = (accountIndex) => ({
  type: actionTypes.SELECT_ACCOUNT,
  payload: accountIndex,
});
