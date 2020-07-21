import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';

const SignInScreen = (props) => {
  const { signIn } = props;
  const [email, setEmail] = React.useState('req123@body.email');
  const [password, setPassword] = React.useState('req112.body.password');

  const toSignIn = async () => {
    await signIn({ email, password });
    console.log({ email, password });
  };

  console.log({ props });

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center' }}
    >
      <View>
        <View>
          <View>
            <Text>{'Sign In'}</Text>
          </View>
        </View>
        <View>
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
          <Button
            onPress={async () => await toSignIn()}
            title="Sign In"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
