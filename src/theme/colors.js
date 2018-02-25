/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const app = {
  underlayColor: 'transparent',
  background: '#FFFFFF00',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
  transparentColor: '#FFFFFF00',
};

const brand = {
  brand: {
    primary: '#0066ff',
    blue: '#0066ff',
    red: '#FF0000',
    secondary: '#17233D',
    disabled: '#adadad',
  },
};

const text = {
  textPrimary: '#222222',
  textSecondary: '#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};

const borders = {
  border: '#efeff3',
};

const tabbar = {
  tabbar: {
    background: '#ffffff',
    iconDefault: '#000000',
    iconSelected: brand.brand.primary,
  },
};

export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
};
