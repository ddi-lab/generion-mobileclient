import React, { Component } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

import { AppSizes } from '@theme/';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    loading: !!(
        state.records.createInProgress ||
        state.records.allRecordsInProgress ||
        state.orders.createInProgress ||
        state.orders.allOrdersInProgress
    ),
});

const mapDispatchToProps = {
};

class RootContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading &&
            <Progress.Bar progress={0.3} width={AppSizes.screen.width} indeterminate borderWidth={0} />
        }
        {this.props.children}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

