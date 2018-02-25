import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    DrawerLayoutAndroid,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    Text,
    View,
    WebView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
// Consts and Libs
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppFonts, AppColors, AppSizes } from '@theme/';

// Components

import { Spacer, Toolbar, ScrollViewWithNavbar, BackButton, CommonContentSlider, EventSlider, EventSliderItem, PlaceSlider, EventRawItem, EventSmallSliderItem, EventSmallSlider, VotesCandidatsView } from '@ui/';
import { connect } from 'react-redux';

import { loadInfoCodes } from '@redux/common/actions';
import CustomToolbar from '../../components/ui/Toolbar';


/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  infoCodes: state.common.infoCodes,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  loadInfoCodes,
};

const styles = StyleSheet.create({
  root: {
    ...AppStyles.appContainer,
    height: '100%',
    paddingTop: 40,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    paddingBottom: 31,
    fontSize: 34,
    ...AppFonts.base.fontBold,
    lineHeight: 41,
    textAlign: 'left',
    color: 'black',
  },
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class CreateRecordView extends Component {
  static componentName = 'CreateRecordView';

  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: collectionsDS.cloneWithRows([]),
    };
  }

  renderHeader = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New record</Text>
      </View>
    )
  }

  renderRow = (rowData) => {
    return (
      <View>
        <Text>{rowData.name}</Text>
        <Text>{rowData.field}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <SafeAreaView renderToHardwareTextureAndroid>
          
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={this.renderHeader}
            renderRow={this.renderRow}

          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecordView);

