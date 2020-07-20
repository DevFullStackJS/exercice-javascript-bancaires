import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView
} from 'react-native';

const SignInScreen = () => {
  const [username, setUsername] = React.useState('admin@foo.com');
  const [password, setPassword] = React.useState('changeme');


  const signIn = () => {
    console.log({username, password});
  };

  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red' }}>
        <View>
          <View>
            <Text>{'Sign In'}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>Username</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
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
            onPress={() => signIn()}
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
