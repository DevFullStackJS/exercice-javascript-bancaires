import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import styles from './Sigin.style';

import validator from '../../../validator/users';

const {
  usernameValidator,
  ribValidator,
  passwordValidator,
  emailValidator,
  signinValidator,
  signupValidator,
  isNotEmpty,
} = validator;

const DisplyErrorComponet = ({ errors, name }) => {
  if (!errors || !name) {
    return <View />;
  }
  return (
    <View style={styles.inputVew}>
      {
        errors.map(({ msg }, i) => <View key={`${name} ${i}`}>
          <Text style={styles.errorShow}>{msg}</Text>
        </View>)
      }
    </View>
  );
};

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
    setLoading(false);
    if (res && res.data && res.data.error && res.data.error.message) {
      setMessage(res.data.error.message);
    }
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
    if (sign === 'signUp') {
      return signUp({ email, password, username, rib }, (res) => callBack(res));
    }
    await signIn({ email, password }, (res) => callBack(res));
  };

  const goTosignin = signupValidator(errors, ['password', 'email']);
  const goTosignup = signinValidator(errors, ['password', 'email', 'username', 'rib']);

  const isNotEmptyLogin = isNotEmpty(password) || isNotEmpty(email);

  const isNotEmptySignup = isNotEmpty(password) || isNotEmpty(email) || isNotEmpty(username) || isNotEmpty(rib);

  console.log(isNotEmptyLogin, isNotEmptySignup);

  const isInvalidate = sign === 'signUp' ? !(!isNotEmptySignup && !goTosignup) : !(!isNotEmptyLogin && !goTosignin);

  return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{}}
          contentContainerStyle={styles.contentContainerStyle}
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
                  onChangeText={(value => setUsername(() => {
                    setMessage('');
                    setErrors({ ...errors, username: usernameValidator(value, 3) || [] });
                    return value;
                  }))}
                  style={styles.TextInput}
                />
              </View>}
              <DisplyErrorComponet
                errors={errors.username}
                name='username'
              />
              {sign === 'signUp' && <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Rib</Text>
                <TextInput
                  placeholder="rib"
                  value={rib}
                  onChangeText={(value => setRib(() => {
                    setMessage('');
                    setErrors({ ...errors, rib: ribValidator(value, 20) || [] });
                    return value;
                  }))}
                  style={styles.TextInput}
                  keyboardType='numeric'
                />
              </View>}
              <DisplyErrorComponet
                errors={errors.rib}
                name='rib'
              />
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Email</Text>
                <TextInput
                  placeholder="email"
                  value={email}
                  onChangeText={(value => setEmail(() => {
                    setMessage('');
                    setErrors({ ...errors, email: emailValidator(value) || [] });
                    return value;
                  }))}
                  style={styles.TextInput}
                  autoCompleteType='email'
                  keyboardType='email-address'
                />
              </View>
              <DisplyErrorComponet
                errors={errors.email}
                name='email'
              />
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>Password</Text>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={(value => setPassword(() => {
                    setMessage('');
                    setErrors({ ...errors, password: passwordValidator(value) || [] });
                    return value;
                  }))}
                  secureTextEntry
                  style={styles.TextInput}
                  autoCompleteType='password'
                />
              </View>
              <DisplyErrorComponet
                errors={errors.password}
                name='password'
              />
              <Text style={styles.messageShow}>{message}</Text>
            </View>
            <View>
              {!loading ? <Button
                disabled={isInvalidate}
                onPress={async () => await toSignIn()}
                title={signTitle}
                color={isInvalidate ? '#808080' : 'blue'}
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
                style={styles.btn}
                containerStyle={styles.containerStyle}
              />
            </View>
          </View>
        </ScrollView>
      </View>
  );
};

export default SignInScreen;
