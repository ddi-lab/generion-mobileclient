import * as actionTypes from './types';
import userData from '../__data/userData';
import tokensData from '../__data/tokensData';
import assetsData from '../__data/assetsData';
import favoritesData from '../__data/favoritesData';

export const getMainData = () => {
  const FAKEDATA = [{
    type: 'personal',
    title: 'Мой профиль',
    data: {
      ...userData,
    },
  }, {
    type: 'favorites',
    title: 'Избранное',
    data: {
      items: favoritesData,
    },
  }, {
    type: 'tokens',
    title: 'Криптовалюта',
    data: {
      items: tokensData.slice(0, 2),
    },
  }, {
    type: 'assets',
    title: 'Активы',
    data: {
      items: assetsData.slice(0, 2),
    },
  }];

  return {
    type: actionTypes.GET_MAIN_DATA,
    data: FAKEDATA,
  };
};
