/**
 * App Styles
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

import { Dimensions, Platform } from 'react-native';

export default {


  headerContainer: {
    backgroundColor: Colors.brand.primary,
  },
  appContainer: {
    backgroundColor: '#ffffff',
    paddingTop: (Platform.OS === 'ios') ? 0 : 24,
  },
  appContainerNoPadding: {
    backgroundColor: '#ffffff',
  },


  roundContainer: {
    backgroundColor: '#f7f7f7',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 9,
    marginBottom: 9,
    padding: 15,
    borderWidth: 2,
    borderColor: '#f7f7f7',
    borderRadius: 8,
  },

  // Default
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },

  // Text Styles
  baseText: {
    fontFamily: Fonts.base.fontFamilyLight,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    ...Fonts.base.fontLight,
  },
  p: {
    fontFamily: Fonts.base.fontFamilyLight,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    ...Fonts.base.fontLight,
    marginBottom: 8,
  },
  h1: {
    fontFamily: Fonts.h1.family,
    fontSize: Fonts.h1.size,
    lineHeight: Fonts.h1.lineHeight,
    color: Colors.headingPrimary,
    ...Fonts.base.fontExtraBold,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h2: {
    ...Fonts.base.fontBlack,
    fontSize: 23,
    color: 'black',
    margin: Sizes.containerPadding,
    textAlign: 'left',
    marginBottom: 15,
  },
  h3: {
    fontFamily: Fonts.h3.family,
    fontSize: Fonts.h3.size,
    lineHeight: Fonts.h3.lineHeight,
    color: Colors.headingPrimary,
    ...Fonts.base.fontMedium,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h4: {
    fontFamily: Fonts.h4.family,
    fontSize: Fonts.h4.size,
    lineHeight: Fonts.h4.lineHeight,
    color: Colors.headingPrimary,
    ...Fonts.base.fontExtraBold,
    margin: 0,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  h5: {
    fontFamily: Fonts.h5.family,
    fontSize: Fonts.h5.size,
    lineHeight: Fonts.h5.lineHeight,
    color: Colors.headingPrimary,
    ...Fonts.base.fontExtraBold,
    margin: 0,
    marginTop: 4,
    marginBottom: 4,
    left: 0,
    right: 0,
  },
  strong: {
    ...Fonts.base.fontBlack,
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand.primary,
  },
  subtext: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 0.8,
    lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
    color: Colors.textSecondary,
    ...Fonts.base.fontMedium,
  },

  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },

  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },


  // Navbar
  navbar: {
    paddingLeft: Sizes.containerPadding,
    backgroundColor: Colors.transparentColor,
    borderBottomWidth: 0,
    elevation: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  navbarNoTitle: {
    ...Fonts.base.fontBlack,
    fontSize: 20,
    marginRight: 100,
    color: 'black',
  },
  navbarNoTitleWhite: {
    ...Fonts.base.fontBlack,
    fontSize: 20,
    marginRight: 100,
    color: 'white',
  },
  backButton: {
    tintColor: 'red',
  },

  rightButton: {
    marginTop: 6,
    width: 23,
    height: 5,
    marginRight: 6,
  },
  navbarTitle: {
    color: Colors.transparentColor,
  },
  navbarButton: {
    tintColor: '#000000',
  },
  navbarButtonRight: {
    width: 23,
    height: 5,
  },

  // TabBar
  tabbar: {
    backgroundColor: Colors.tabbar.background,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },


  calendarStyles: {

    calendarContainer: {

    },
  },

  cardTopHeader: {
    height: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTopHeaderCloseLine: { height: 3, width: 40, backgroundColor: 'rgba(203, 205, 204, 0.3)', marginTop: 20, marginBottom: 20 },


  shadowImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 0,
    borderColor: '#fff',
    shadowColor: '#555',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.79,
    shadowRadius: 8,
  },
};
