import * as actionTypes from './types';

const initialState = {
  wallet: null,
  account: null,
  rsaKey: null,
};

const handlers = {};

// Wallet
handlers[actionTypes.SET_WALLET] = (state, action) => ({
  ...state,
  wallet: action.payload.wallet,
  account: action.payload.wallet.accounts[action.payload.account],
  rsaKey: action.payload.rsaKey,
});
handlers[actionTypes.CLEAR_WALLET] = (state, action) => ({
  ...state,
  wallet: null,
  account: null,
});

// Account
handlers[actionTypes.SELECT_ACCOUNT] = (state, action) => ({
  ...state,
  account: (state.wallet !== null && state.wallet.accounts.length >= action.payload + 1) ? state.wallet.accounts[action.payload] : null,
});


export default (state = initialState, action) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};
