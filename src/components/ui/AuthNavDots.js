import React, { Component } from 'react';
import { bool, number } from 'prop-types';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const DOT_ANIMATION_DURATION = 200;
const DOT_STYLE = {
  nonActive: {
    sizing: 6,
    margin: 3,
    borderRadius: 3,
    backgroundColor: '#b4bdc8'
  },
  active: {
    sizing: 12,
    margin: 0,
    borderRadius: 6,
    backgroundColor: '#06f'
  }
};
const DOT_ANIMATED_PROPS = ['sizing', 'margin', 'borderRadius'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute'
  },
  dot: {
    marginRight: 12
  }
});

class Dot extends Component {
  constructor(props) {
    super(props);

    const styleName = props.isActive === true ? 'active' : 'nonActive';

    this.state = {
      sizing: new Animated.Value(DOT_STYLE[styleName].sizing),
      margin: new Animated.Value(DOT_STYLE[styleName].margin),
      borderRadius: new Animated.Value(DOT_STYLE[styleName].borderRadius)
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { isActive } = this.props;

    if (isActive !== nextProps.isActive) {
      const targetStyleName = isActive === true ? 'nonActive' : 'active';

      DOT_ANIMATED_PROPS.forEach(propName => {
        Animated.timing(this.state[propName], {
          toValue: DOT_STYLE[targetStyleName][propName],
          duration: DOT_ANIMATION_DURATION,
          easing: Easing.easeOutQuint
        }).start();
      });
    }
  }

  get style() {
    const { sizing, margin, borderRadius } = this.state;
    const { isActive } = this.props;

    return {
      width: sizing,
      height: sizing,
      borderRadius,
      marginTop: margin,
      marginBottom: margin,
      backgroundColor:
        isActive === true
          ? DOT_STYLE.active.backgroundColor
          : DOT_STYLE.nonActive.backgroundColor
    };
  }

  render() {
    const { isActive } = this.props;

    return <Animated.View style={[this.style, styles.dot]} />;
  }
}

Dot.propTypes = {
  isActive: bool.isRequired
};

const AuthNavDots = ({ length, activeIndex, style }) => {
  if (activeIndex >= length) {
    return null;
  }

  const result = [];

  for (let i = 0; i < length; i++) {
    const style = activeIndex === i ? styles.active : styles.nonActive;
    result.push(<Dot isActive={activeIndex === i} key={i} />);
  }

  return <View style={[styles.container, style]}>{result}</View>;
};

AuthNavDots.propTypes = {
  length: number.isRequired,
  activeIndex: number.isRequired
};

export default AuthNavDots;
