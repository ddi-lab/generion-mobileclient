/**
 * App Theme - Fonts
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Platform } from 'react-native';

function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const base = {
  size: 16,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      // family: 'Proxima Nova',
      // fontFamily: 'Proxima Nova',
      // fontFamilyRegular: 'Proxima Nova',
      fontLight: {
        fontFamily: 'System',
        fontWeight: '300',
      },
      fontRegular: {
        fontFamily: 'System',
        fontWeight: '400',
      },

      fontMedium: {
        fontFamily: 'System',
        fontWeight: '500',
      },

      fontSemiBold: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      fontBold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      fontExtraBold: {
        fontFamily: 'System',
        fontWeight: '800',
      },
      fontBlack: {
        fontFamily: 'System',
        fontWeight: '900',
      },
      fontHeavy: {
        fontFamily: 'System',
      },
      // family: 'HelveticaNeue',
    },
    android: {
      family: 'proxima_nova',
      fontFamily: 'proxima_nova',
      fontFamilyRegular: 'proxima_nova_regular',
      fontFamilyLight: 'proxima_nova_light',
      fontLight: {
        fontFamily: 'proxima_nova_light',
      },
      fontRegular: {
        fontFamily: 'proxima_nova_regular',
      },

      fontMedium: {
        fontFamily: 'proxima_nova_medium',
      },

      fontSemiBold: {
        fontFamily: 'proxima_nova_semibold',
      },
      fontBold: {
        fontFamily: 'proxima_nova_bold',
      },
      fontExtraBold: {
        fontFamily: 'proxima_nova_extrabold',
      },
      fontBlack: {
        fontFamily: 'proxima_nova_black',
      },
    },
  }),
};

export default {
  base: { ...base },
  h1: { ...base, size: base.size * 1.75, lineHeight: lineHeight(base.size * 2) },
  h2: { ...base, size: base.size * 1.5, lineHeight: lineHeight(base.size * 1.75) },
  h3: { ...base, size: base.size * 1.25, lineHeight: lineHeight(base.size * 1.5) },
  h4: { ...base, size: base.size * 1.1, lineHeight: lineHeight(base.size * 1.25) },
  h5: { ...base },
};
