/**
 * App Theme - Sizes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;
const statusBarHeight = (Platform.OS === 'ios') ? 20 : 0;

export default {
  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
  },
  navbarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight,
  tabbarHeight: 51,

  padding: 20,
  textPadding: 16,
  paddingSml: 10,

  borderRadius: 2,


  containerPadding: 15,

  modalHeight: (Platform.OS === 'ios') ? height - statusBarHeight - 20 : height - statusBarHeight - 50,
};
