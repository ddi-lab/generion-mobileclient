/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
import { AppColors, AppStyles, AppSizes } from '@theme/';

// noinspection JSAnnotator
export default {
  // App Details
  appName: '',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,


  // URLs
  urls: {
  },

  // Navbar Props
  navbarProps: {
    hideNavBar: false,
    navigationBarStyle: AppStyles.navbar,
  },
  navbarPropsBigButton: {
    hideNavBar: false,
    navigationBarStyle: AppStyles.navbar,
    backButtonTextStyle: AppStyles.navbarNoTitle,
    leftButtonIconStyle: AppStyles.backButton,
    navBarButtonColor: AppStyles.black,
    titleStyle: AppStyles.navbarTitle,
  },

  navbarPropsBigButtonWhite: {
    hideNavBar: false,
    navigationBarStyle: AppStyles.navbar,
    backButtonTextStyle: AppStyles.navbarNoTitleWhite,
    leftButtonIconStyle: AppStyles.backButton,
    navBarButtonColor: AppStyles.black,
    titleStyle: AppStyles.navbarTitle,
  },


  navbarCommonProps: {
    hideNavBar: true,
  },
};
