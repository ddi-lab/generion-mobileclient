import * as Keychain from 'react-native-keychain';

const username = 'username123';

class Credentials {

  saveTokenData = (token) => {
    Keychain
            .setGenericPassword(username, token)
            .then(() => {
            //  console.log({ status: 'Credentials saved!' });
            })
            .catch((err) => {
            //  console.log({ status: `Could not save credentials, ${err}` });
            });
  };


  getTokenData = () => Keychain
          .getGenericPassword() ;


  cleanTokenData = () => Keychain.resetGenericPassword();
}

export default new Credentials();

