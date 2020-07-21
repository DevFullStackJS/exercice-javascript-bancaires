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
} from 'react-native';

const x = Dimensions.get('window').width;
// const y = Dimensions.get('window').y;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
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
  },
  TextInput: {
    padding: 10,
    borderWidth: 1,
    width: x / 2,
    borderRadius: 15,
  },
});

const SignInScreen = (props) => {
  const { signIn, signUp } = props;
  const [email, setEmail] = React.useState('resdyyy3@body.email');
  const [password, setPassword] = React.useState('req1dd12.body.password');
  const [username, setUsername] = React.useState('name');
  const [message, setMessage] = React.useState('');
  const [rib, setRib] = React.useState('dsqsbdggdddddddsddddddfsdfsf');
  const [sign, setSign] = React.useState('signIn');
  const [n_sign, setNoSign] = React.useState('signIn');
  const [signTitle, setSignTitle] = React.useState('sign In');

  const toogleSign = () => {
    setSign(sign === 'signIn' ? 'signUp' : 'signIn');
    setNoSign(sign !== 'signIn' ? 'sign Up' : 'sign In');
    setSignTitle(sign === 'signIn' ? 'sign Up' : 'sign In');
  };

  const callBack = (res) => {
    if (res && res.data && res.data._id) {
      toogleSign();
      setMessage('Ajout avec succes');
    }
  };

  const toSignIn = async () => {
    console.log({ email, password });
    if (sign === 'signUp') {
      return signUp({ email, password, username, rib }, (res) => callBack(res));
    }
    await signIn({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View>
            <View>
              <Button
                onPress={() => toogleSign()}
                title={n_sign}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
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
            <Text>{message}</Text>
          </View>
          <View>
            <Button
              onPress={async () => await toSignIn()}
              title={signTitle}
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
