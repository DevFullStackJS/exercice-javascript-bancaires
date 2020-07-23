import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
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
    // justifyContent: 'center',
    // backgroundColor: 'white',
    // alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: x,
    height: y,
  },
  titleContainer: {
    paddingTop: 20,
  },
  inputVew: {
    margin: 50,
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
    margin: 5, color: 'red',
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    margin: 7,
    padding: 10,
  },
  textPage: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

const SignInScreen = (props) => {
  const { signIn, signUp } = props;
  const [email, setEmail] = React.useState('resdyyy3@body.email');
  const [password, setPassword] = React.useState('req1dd12.body.password');
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [rib, setRib] = React.useState('');
  const [sign, setSign] = React.useState('signIn');
  const [n_sign, setNoSign] = React.useState('signUp');
  const [signTitle, setSignTitle] = React.useState('sign In');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const toogleSign = () => {
    setError('');
    setSign(sign === 'signIn' ? 'signUp' : 'signIn');
    setNoSign(sign !== 'signIn' ? 'sign Up' : 'sign In');
    setSignTitle(sign === 'signIn' ? 'sign Up' : 'sign In');
  };

  const callBack = (res) => {
    console.log({ res });
    setLoading(false);
    if (res && res.data && res.data.error) {
      return setError(res.data.error);
    }
    if (sign === 'signUp' && res && res.data && res.data._id) {
      toogleSign();
      setMessage('Ajout avec succes');
    }
  };

  const toSignIn = async () => {
    setError('');
    setLoading(true);
    console.log({ email, password });
    if (sign === 'signUp') {
      return signUp({ email, password, username, rib }, (res) => callBack(res));
    }
    await signIn({ email, password }, (res) => callBack(res));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.textPage}>{sign}</Text>
          </View>
          <View>
            {sign === 'signUp' && <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Username</Text>
              <TextInput
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                style={styles.TextInput}
              />
            </View>}
            {sign === 'signUp' && <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Rib</Text>
              <TextInput
                placeholder="rib"
                value={rib}
                onChangeText={setRib}
                style={styles.TextInput}
              />
            </View>}
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Email</Text>
              <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                style={styles.TextInput}
              />
            </View>
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
            <Text style={styles.messageShow}>{message}</Text>
            <Text style={styles.errorShow}>{error}</Text>
          </View>
          <View>
            {!loading ? <Button
              onPress={async () => await toSignIn()}
              title={signTitle}
              color='blue'
              accessibilityLabel="Learn more about this purple button"
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
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
