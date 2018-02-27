import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Bubbles } from 'react-native-loader';
import {
  View,
  Image,

  StyleSheet,
  Text,
    TextInput,
    Button as CommonButton,
  StatusBar,
  Alert,
  AsyncStorage,
} from 'react-native';
import moment from 'moment';

import { PhotoUpload, Button, DateInput, AuthNavDots } from '@ui/';

import { AppStyles, AppSizes, AppFonts } from '@theme';
import { ErrorCodes } from '@constants';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { setWallet } from '@redux/auth/actions';
import Neon, { wallet } from '@cityofzion/neon-js';
import { randomKey, createRSAKey } from '@lib/security';

const styles = StyleSheet.create({
  background: {
    paddingTop: 40,
    backgroundColor: 'white',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  textInputStyle: {
    height: 50,
    borderColor: '#e3e3e3',
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
  },
  logo: {
    width: 70,
    height: 15,
    marginBottom: 82,
  },
  whiteText: {
    color: '#FFF',
  },
  title: {
    fontSize: 15,
    ...AppFonts.base.fontBold,
    lineHeight: 26,
    textAlign: 'left',
    color: '#0066ff',
    marginBottom: 12,
  },
  bigTitle: {
    paddingBottom: 31,
    fontSize: 40,
    ...AppFonts.base.fontBlack,
    lineHeight: 40,
    textAlign: 'left',
    color: 'black',
  },
  smalTitle: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.25,
    color: 'black',
    marginRight: 30,
    marginTop: 27,
    marginBottom: 40,
  },
  tabContainer: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 20,
  },
  authNavDots: {
    left: 27,
    bottom: 30,
  },
  textField: {
    paddingTop: 10,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#cdced3',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  textFieldName: {
    marginBottom: 3,
    ...AppFonts.base.fontRegular,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: '#8e8e93',
  },
  textFieldValue: {
    ...AppFonts.base.fontMedium,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: '#000000',
  },
});


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  saveWallet: setWallet,
};

class Authenticate extends Component {
  static componentName = 'Authenticate';
  
  constructor(props) {
    super(props);
    this.wallet = null;
    this.state = {
      passphrase: '',
      passphraseRepeat: '',
      restoringAuth: false,

      loading: false,
      name: '',
      lastName: '',
      birthday: null,
      passportNumber: '',
      passportPlace: '',
      passportDate: null,
      photoUri: '',
      navigation: {
        index: 0,
        routes: [
              { key: '0', title: '1' },
              { key: '1', title: '2' },
            { key: '3', title: '3' },
            { key: '4', title: '4' },
        ],
      },
    };
  }

  componentDidMount() {
    this.restore();
  }

  componentWillReceiveProps(nextProps) {

  }

  loginStart = () => {
    this.setState({ loading: true });
  }

  loginCanceled = () => {
    this.showError();
    this.setState({ loading: false });
  }

  loginFailed = (errorCode) => {
    this.setState({ loading: false });
    this.showError(errorCode);
  }

  showError = (errorCode = ErrorCodes.unknown) => {
    const message = `Что-то пошло не так.\nПопробуйте еще раз.\n\nКод ошибки: ${errorCode}`;

    setTimeout(() => {
      Alert.alert('Ошибка', message);
    }, 500);
  }

  nextStep =(index) => {
    this.handleChangeTab(index);
  }

  createWallet = async () => {
    const rsaKey = await createRSAKey();
    const accountPrivateKey = await randomKey(32);
    const account = new wallet.Account(accountPrivateKey);
    this.wallet = Neon.create.wallet();
    this.wallet.addAccount(account);

    const storageData = {
      accountPrivateKey,
      rsaPrivateKey: rsaKey.getPrivateString(),
    };

    await AsyncStorage.setItem('@Store:keysData4', JSON.stringify(storageData));
    this.props.saveWallet({
      wallet: this.wallet,
      rsaKey,
    });
    
    Actions.app();
    // this.nextStep(1);
  }

  restore = async () => {
    this.setState({
      restoringAuth: true,
    });

    const keyData = await AsyncStorage.getItem('@Store:keysData4');
    
    if(keyData !== null){
      const data = JSON.parse(keyData);
      const rsaKey = await createRSAKey();
      rsaKey.setPrivateString(data.rsaPrivateKey);

      const account = new wallet.Account(data.accountPrivateKey);
      this.wallet = Neon.create.wallet();
      this.wallet.addAccount(account);

      this.props.saveWallet({
        wallet: this.wallet,
        rsaKey,
      });
      Actions.app();
      
    } else {
      this.setState({
        restoringAuth: false,
      });
    }
  }

  validateStep(step) {
    const notEmpty = value => value !== '' && value !== null;

    switch (step) {
    case '0':
      const { name, lastName, birthday } = this.state;
      return [name, lastName, birthday].every(notEmpty);

    case '1':
      const { passphrase, passphraseRepeat } = this.state;
      return [passphrase, passphraseRepeat].every(notEmpty);

    case '3':
      const { photoUri } = this.state;
      return notEmpty(photoUri);
    }

    return true;
  }

  renderScene = ({ route }) => {
    const isSceneValidated = this.validateStep(route.key);

    if (this.state.restoringAuth) {
      return (
        <View style={styles.tabContainer}>

          <Text style={styles.title}>WELCOME TO GENERION</Text>


          <Text style={styles.bigTitle}>{'Restoring\nwallet....'}</Text>
        </View>
      );
    }

    switch (route.key) {
      case '0' :
        return (
          <View style={styles.tabContainer}>

            <Text style={styles.title}>WELCOME TO GENERION</Text>


            <Text style={styles.bigTitle}>Authorize</Text>

            <Button
              style={styles.button}
              onPress={() => this.createWallet()}
              title="Create wallet"
              accessibilityLabel="Create wallet"
            />

            <Button
              style={styles.button}
              onPress={() => this.nextStep(1)}
              title="Login by private key"
              accessibilityLabel="Login by private key"
            />

          </View>
        );
      case '1' :
        return (
          <View style={styles.tabContainer}>

            <Text style={styles.title}>REGISTARTION</Text>


            <Text style={styles.bigTitle}>Create new key</Text>
            {this.wallet !== null && this.wallet.accounts.length > 0 &&
              <Text >{this.wallet.accounts[0].address}</Text>
            }


            <TextInput
              style={styles.textInputStyle}
              placeholder="Passphrase"
              onChangeText={passphrase => this.setState({ passphrase })}
              value={this.state.passphrase}
              secureTextEntry
            />

            <TextInput
              style={styles.textInputStyle}
              placeholder="Repeat passphrase"
              onChangeText={passphraseRepeat => this.setState({ passphraseRepeat })}
              value={this.state.passphraseRepeat}
              secureTextEntry
            />

            <Button
              style={styles.button}
              title="Generate key"
              onPress={this.createWallet}
              disabled={isSceneValidated === false}
              accessibilityLabel="Generate key"
            />

            <CommonButton
              title="Back"
              onPress={() => this.nextStep(0)}
              color="#5a6062"
              accessibilityLabel="Back"
            />
          </View>
        );
      case '3': 
        return (
          <View style={styles.tabContainer}>
            <Text style={styles.title}>REGISTRATION</Text>
            <Text style={styles.bigTitle}>Save your key</Text>

            <View style={styles.textField}>
              <Text style={styles.textFieldName}>{'Passphrase'}</Text>
              <Text style={styles.textFieldValue}>{this.state.passphrase}</Text>
            </View>

            <View style={styles.textField}>
              <Text style={styles.textFieldName}>{'Address'}</Text>
              <Text style={styles.textFieldValue}>{'asdasdsadas'}</Text>
            </View>

            <View style={styles.textField}>
              <Text style={styles.textFieldName}>{'Public key'}</Text>
              <Text style={styles.textFieldValue}>{'erhewlirn32oiru32432r32o4j3rh'}</Text>
            </View>

            <View style={styles.textField}>
              <Text style={styles.textFieldName}>{'Private key'}</Text>
              <Text style={styles.textFieldValue}>{'UFHsfasdfsalkfbaKLHFLKJAHFashflkashfaklJHFKLjahLKFHalksfhaskjfha:K'}</Text>
            </View>
          </View>
        )
      case 'photo' :
        return (

          <View style={styles.tabContainer}>

            <Text style={styles.title}>РЕГИСТРАЦИЯ</Text>

            <Text style={styles.bigTitle}>Ваша
                    фотография</Text>

            <PhotoUpload
              onChange={photoUri => this.setState({ photoUri })}
            />

            <Button
              style={[styles.button, { marginTop: 40 }]}
              title="Регистрация"
              onPress={() => this.nextStep(3)}
              disabled={isSceneValidated === false}
              accessibilityLabel="Регистрация"
            />

            <CommonButton
              title="Назад"
              onPress={() => this.nextStep(2)}
              color="#5a6062"
              accessibilityLabel="Назад"
            />
          </View>
        );
      case '4' :
        return (

          <View style={[{ paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20 }]}
          >

            <Text style={styles.title} />

            <Text style={styles.bigTitle}>Спасибо за регистрацию!</Text>

            <Text style={[styles.title, { fontSize: 21 }]}>Подтвердите Вашу личность предъявив этот QR-code в любом из центров «Мои документы»</Text>


            <View style={{
              justifyContent: 'center',
              alignItems: 'center' }}
            >
              <Image
                style={{ width: 172,
                  height: 172,
                  marginTop: 30,
                  marginBottom: 30 }}
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?data=When+you+grow+up+you+tend+to+get+told+that+the+world+is+the+way+it+is+and+you%27re+life+is+just+to+live+your+life+inside+the+world.+Try+not+to+bash+into+the+walls+too+much.+Try+to+have+a+nice+family+life%2C+have+fun%2C+save+a+little+money.+That%27s+a+very+limited+life.+%0ALife+can+be+much+broader+once+you+discover+one+simple+fact%3A+Everything+around+you+that+you+call+life+was+made+up+by+people+that+were+no+smarter+than+you.+And+you+can+change+it%2C+you+can+influence+it%E2%80%A6+Once+you+learn+that%2C+you%27ll+never+be+the+same+again.&size=220x220&margin=0' }}
              />
            </View>


            <CommonButton
              title="Готово"
              onPress={() => Actions.reset('app')}
              color="#5a6062"
              accessibilityLabel="Готово"
            />
          </View>
        );
      default:
        return null;// this.renderRoomView();
    }
  }
  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }


  render = () => (
    <View style={[AppStyles.container, styles.background, { }]}>
      <StatusBar animated hidden />

      <TabViewAnimated
        style={[styles.tabbar, {
          paddingTop: 19,
        }]}
        renderScene={this.renderScene}
        navigationState={this.state.navigation}
        onRequestChangeTab={this.handleChangeTab}
        swipeEnabled={false}
      />


      <View style={{ flexDirection: 'row', paddingBottom: 50 }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Bubbles size={this.state.loading ? 10 : 0} color="#FFF" />
      </View>

      <AuthNavDots
        length={ this.state.navigation.routes.length - 1}
        activeIndex={ this.state.navigation.index }
        style={styles.authNavDots}
      />
    </View>
  )
}

function formatDate(date) {
  if (date instanceof Date === false) {
    return null;
  }

  return moment(date).format('DD MMMM YYYY');
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
