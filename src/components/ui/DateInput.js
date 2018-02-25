import React, { Component } from 'react';
import { func } from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

class DateInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datepickerVisible: false
    };
  }

  onPress = () => {
    this.setState({ datepickerVisible: true });
  };

  onConfirm = date => {
    this.props.onChange(date);
    this.setState({ datepickerVisible: false });
  };

  onCancel = () => {
    this.props.onChange(null);
    this.setState({ datepickerVisible: false });
  };

  render() {
    const { children } = this.props;
    const { datepickerVisible } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={this.onPress} key="1">
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              pointerEvents: 'none'
            });
          })}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={datepickerVisible}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          key="2"
        />
      </View>
    );
  }
}

DateInput.propTypes = {
  onChange: func.isRequired
};

export default DateInput;
