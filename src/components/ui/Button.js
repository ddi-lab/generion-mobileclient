/**
 * Buttons
 *
     <Button text={'Server is down'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

// Consts and Libs
import { AppColors, AppFonts, AppSizes } from '@theme/';

/* Component ==================================================================== */
class CustomButton extends Component {
  static propTypes = {
    small: PropTypes.bool,
    large: PropTypes.bool,
    outlined: PropTypes.bool,
    upperCase: PropTypes.bool,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    small: false,
    large: false,
    outlined: false,
    upperCase: false,
    icon: {},
    backgroundColor: null,
    onPress: null,
  }

  buttonProps = () => {
    // Defaults
    const props = {
      title: 'Coming Soon...',
      color: '#fff',
      onPress: this.props.onPress,
      fontSize: 16,
      letterSpacing: 4,
      borderRadius: 0, // AppSizes.borderRadius,
      raised: true,
      disabled: false,
      buttonStyle: {
        padding: 9,
      },
      containerViewStyle: {
        marginLeft: 0,
        marginRight: 0,
      },
      ...this.props,
      backgroundColor: this.props.backgroundColor || AppColors.brand.primary,
      small: false,
      large: false,
      icon: (this.props.icon && this.props.icon.name)
        ? {
          size: 14,
          ...this.props.icon,
        } : null,

    };

    // Overrides
    // Size
    if (this.props.small) {
      props.fontSize = 11;
      props.lineHeight = 13;
      props.buttonStyle.paddingTop = 4;
      props.buttonStyle.paddingBottom = 4;
      props.buttonStyle.paddingLeft = 10;
      props.buttonStyle.paddingRight = 10;

      if (props.icon && props.icon.name) {
        props.icon = {
          size: 14,
          ...props.icon,
        };
      }
    }
    if (this.props.large) {
      props.buttonStyle.padding = 15;

      if (props.icon && props.icon.name) {
        props.icon = {
          size: 20,
          ...props.icon,
        };
      }

      Object.assign(props, AppFonts.base.fontBold);
    } else {
      Object.assign(props, AppFonts.base.fontExtraBold);
    }

    props.buttonStyle.borderWidth = 3;
    props.buttonStyle.borderColor = props.backgroundColor;
    

    // Outlined
    if (this.props.outlined) {
      props.raised = false;
      props.backgroundColor = this.props.backgroundColor || 'transparent';
      props.color = AppColors.brand.primary;
      props.buttonStyle.borderColor = AppColors.brand.primary;

      if (props.icon && props.icon.name) {
        props.icon = {
          color: AppColors.brand.primary,
          ...props.icon,
        };
      }
    }

    if (this.props.textOnly) {
      props.backgroundColor = AppColors.brand.primary;
      props.color = 'white';//AppColors.brand.primary;
      props.buttonStyle.borderWidth = 0;
    }

    if (this.props.upperCase) {
      props.fontSize = 12;
      props.title = props.title.toUpperCase(); 
      if (this.props.large) {
        props.fontSize = 14;
        Object.assign(props, AppFonts.base.fontExtraBold);
      }
    }

    if (this.props.round) {
      props.borderRadius = 9;
    }

    if (this.props.disabled) {
      props.backgroundColor = AppColors.brand.disabled;
      props.buttonStyle = Object.assign(
        {},
        props.buttonStyle,
        {
          borderColor: AppColors.brand.disabled
        }
      );
      props.onPress = null;
      // убрать тинт кнопки
      props.disabled = false;
    }

    props.raised = false;

    return props;
  }

  render = () => <Button {...this.buttonProps()} />;
}

/* Export Component ==================================================================== */
export default CustomButton;
