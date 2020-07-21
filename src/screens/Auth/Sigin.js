import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';

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
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center' }}
    >
      <View>
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
          {sign === 'signUp' && <View>
            <Text>Username</Text>
            <TextInput
              placeholder="username"
              value={username}
              onChangeText={setUsername}
            />
          </View>}
          {sign === 'signUp' && <View>
            <Text>Rib</Text>
            <TextInput
              placeholder="rib"
              value={rib}
              onChangeText={setRib}
            />
          </View>}
          <View>
            <Text>Email</Text>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Text>{message}</Text>
          <Button
            onPress={async () => await toSignIn()}
            title={signTitle}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
