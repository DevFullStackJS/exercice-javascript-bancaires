import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: x,
    height: y - 100,
  },
  titleContainer: {
    paddingTop: 20,
  },
  inputVew: {
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  labelInput: {
    paddingRight: 10,
    width: x / 4,
    color: 'red',
    fontWeight: 'bold',
  },
  TextInput: {
    padding: 10,
    borderWidth: 1,
    width: x / 2,
    borderRadius: 15,
    borderColor: 'red',
    color: 'red',
    fontWeight: 'bold',
  },
  messageShow: {
    textAlign: 'center',
    margin: 5,
  },
  errorShow: {
    textAlign: 'center',
    margin: 5,
    color: 'blue',
  },
  option: {
    paddingBottom: 5,
  },
  optionSeparatorStr: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signinContainer: {
    flex: 1,
    margin: 7,
    padding: 10,
  },
  textPage: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btn: {
    paddingLeft: 30, paddingRight: 30,
  },
});

const SignInScreen = (props) => {
  const { signIn, signUp } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [rib, setRib] = React.useState('');
  const [sign, setSign] = React.useState('signIn');
  const [n_sign, setNoSign] = React.useState('signUp');
  const [signTitle, setSignTitle] = React.useState('sign In');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const toogleSign = () => {
    setErrors({});
    setSign(sign === 'signIn' ? 'signUp' : 'signIn');
    setNoSign(sign !== 'signIn' ? 'sign Up' : 'sign In');
    setSignTitle(sign === 'signIn' ? 'sign Up' : 'sign In');
  };

  const callBack = (res) => {
    console.log({ res });
    setLoading(false);
    if (res && res.errors && res.errors.length > 0) {
      const data = res.errors;
      const resErrors = data.reduce((acc, { param, value, msg }) => ({ ...acc, [param]: { value, msg } }), {});
      return setErrors(resErrors);
    }
    if (sign === 'signUp' && res && res.data && res.data._id) {
      toogleSign();
      setMessage('Ajout avec succes');
    }
  };

  const toSignIn = async () => {
    setErrors({});
    setLoading(true);
    console.log({ email, password });
    if (sign === 'signUp') {
      return signUp({ email, password, username, rib }, (res) => callBack(res));
    }
    await signIn({ email, password }, (res) => callBack(res));
  };

  const displayError = (name) => (errors && errors[name] ? errors[name].msg : '');

  return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            // flex:1,
          }}
          contentContainerStyle={{
            // flex: 1
            width: x,
            height: y - 10,
          }}
        >
          <View style={styles.body}>
            <View style={styles.titleContainer}>
              <Text style={styles.textPage}>{sign}</Text>
            </View>
            <View style={{}}>
              {sign === 'signUp' && <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Username</Text>
                <TextInput
                  placeholder="username"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.TextInput}
                />
              </View>}
              <View><Text style={styles.errorShow}>{displayError('username')}</Text></View>
              {sign === 'signUp' && <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Rib</Text>
                <TextInput
                  placeholder="rib"
                  value={rib}
                  onChangeText={setRib}
                  style={styles.TextInput}
                />
              </View>}
              <View><Text style={styles.errorShow}>{displayError('rib')}</Text></View>
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Email</Text>
                <TextInput
                  placeholder="email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.TextInput}
                />
              </View>
              <View><Text style={styles.errorShow}>{displayError('email')}</Text></View>
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Password</Text>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.TextInput}
                />
              </View>
              <View><Text style={styles.errorShow}>{displayError('password')}</Text></View>
              <Text style={styles.messageShow}>{message}</Text>
            </View>
            <View>
              {!loading ? <Button
                onPress={async () => await toSignIn()}
                title={signTitle}
                color='blue'
                accessibilityLabel="Learn more about this purple button"
                style={styles.btn}
              /> :
                <ActivityIndicator size={'large'} />}
            </View>
            <View style={styles.option}>
              <Text style={styles.optionSeparatorStr}>ou</Text>
              <Button
                onPress={() => toogleSign()}
                title={n_sign}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                style={styles.btn}
              />
            </View>
          </View>
        </ScrollView>
      </View>
  );
};

export default SignInScreen;
