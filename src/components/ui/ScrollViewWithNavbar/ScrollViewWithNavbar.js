/* eslint-disable no-unused-vars,class-methods-use-this,react/prop-types,no-underscore-dangle,no-return-assign,max-len */
/**
 * PopularPost View Screen
 *  - The individual PopularPost screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
    ScrollView,
    Animated,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { AppStyles, AppFonts, AppColors, AppSizes } from '@theme/';
import { BackButton, ShareButton } from '@ui';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 0 : 24; // AppSizes.statusBarHeight;
const NAVBAR_HEIGHT = 44 + STATUS_BAR_HEIGHT;

const contentInset = { top: 0 };

// if (Platform.OS === 'ios') {
//   const iosVersion = parseInt(Platform.Version, 10);
//   if (iosVersion === 11) {
//     contentInset.top = -20;
//   }
// }

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingLeft: AppSizes.containerPadding,
    paddingRight: AppSizes.containerPadding,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fbfbfb',
  },
  navbarTitle: {
    ...AppFonts.base.fontBold,
    paddingLeft: 15,
    paddingRight: 15,
    maxWidth: (Dimensions.get('window').width - (AppSizes.containerPadding * 2) - 90),
    color: '#1a1a1a',
    backgroundColor: 'transparent',
  },
  __contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
});

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class ScrollViewWithNavbar extends Component {
  static componentName = 'ScrollViewWithNavbar';

  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    const navigationOpacity = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      navigationOpacity,
      navigationShown: false,
      clampedScroll: Animated.diffClamp(
        scrollAnim,
        0,
        NAVBAR_HEIGHT,
      ),
    };
  }


  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    // this.state.scrollAnim.addListener(({ value }) => {
    //   this._scrollValue = value;
    //   this._clampedScrollValue = Math.min(
    //     Math.max(value, 0),
    //     NAVBAR_HEIGHT,
    //   );
    //   //this.state.navigationOpacity.Value(this._clampedScrollValue / NAVBAR_HEIGHT);
    //   //console.log(this._clampedScrollValue);
    // });
    // this.state.offsetAnim.addListener(({ value }) => {
    //   this._offsetValue = value;
    // });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }


  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    // const toValue = this._scrollValue > NAVBAR_HEIGHT &&
    //   this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
    //   ? this._offsetValue + NAVBAR_HEIGHT
    //   : this._offsetValue - NAVBAR_HEIGHT;

    // Animated.timing(this.state.offsetAnim, {
    //   toValue,
    //   duration: 350,
    //   useNativeDriver: true,
    // }).start();
  };

  onScroll = (event) => {
    let navigationShown = this.state.navigationShown;
    navigationShown = event.nativeEvent.contentOffset.y >= NAVBAR_HEIGHT / 2;

    if (navigationShown !== this.state.navigationShown) {
      this.setState({ navigationShown });
    }
  }

  render() {
    const {
        shareItem = null,
        invert = false,
    } = this.props;
    const {
      scrollAnim,
      navigationShown,
    } = this.state;

    const navbarOpacity = scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, 1],
    });

    const tintColor = invert ? (navigationShown ? '#000000' : '#000000') : '#000000';
    // const barStyle = invert ? (navigationShown ? 'dark-content' : 'light-content') : 'dark-content';
    const forceInsetTop = invert ? 'never' : 'always';

    return (
      <SafeAreaView forceInset={{ top: forceInsetTop, bottom: 'never' }} style={{ height: '100%' }}>
        {/* <StatusBar
          animated
          barStyle={barStyle}
        /> */}
        <AnimatedScrollView
          // bounces={false}
          //  contentContainerStyle={styles.__contentContainer}
          contentInset={contentInset}
          scrollEventThrottle={1}
          onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              { useNativeDriver: true, listener: this.onScroll },
          )}
        >
          <SafeAreaView style={[styles.__contentContainer, (invert ? { paddingTop: 0 } : {})]} forceInset={{ top: 'never', bottom: 'never' }}>
            {this.props.children}
          </SafeAreaView>
        </AnimatedScrollView>


        <SafeAreaView style={[styles.navbar]}>
          <Animated.View style={[styles.navbarBackground, { opacity: navbarOpacity }]} />
          <View style={{ width: 45 }}>
            <BackButton noMargin style={{ tintColor }} />
          </View>
          {!!this.props.navbarTitle &&
            <Animated.Text style={[styles.navbarTitle, { opacity: navbarOpacity }]} numberOfLines={1}>
                {this.props.navbarTitle}
            </Animated.Text>
          }
          <View style={{ width: 45, alignItems: 'flex-end' }}>
            {shareItem !== null &&
              <ShareButton {...shareItem} style={{ tintColor }} />
            }
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}


export default ScrollViewWithNavbar;

