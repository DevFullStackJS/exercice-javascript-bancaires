import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Modal from '../../components/Common/Modal';

import styles from './styles';

import validator from '../../../validator/users';

const {
  usernameValidator,
  ribValidator,
  passwordValidator,
  signinValidator,
  isNotEmpty,
} = validator;

const signTitle = 'Creation Compte';

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

const SignInScreen = () => {
  // const { } = props;
  const [email, setEmail] = React.useState('resdyyy3@body.email');
  const [password, setPassword] = React.useState('req1dd12.body.password');
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [rib, setRib] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // const callBack = (res) => {
  //   setLoading(false);
  //   if (res && res.data && res.data.error && res.data.error.message) {
  //     setMessage(res.data.error.message);
  //   }
  //   if (res && res.errors && res.errors.length > 0) {
  //     const data = res.errors;
  //     const resErrors = data.reduce((acc, { param, value, msg }) => ({ ...acc, [param]: { value, msg } }), {});
  //     return setErrors(resErrors);
  //   }
  //   if (res && res.data && res.data._id) {
  //     toogleSign();
  //     setMessage('Ajout avec succes');
  //   }
  // };

  const createCompte = async () => {
    setErrors({});
    setLoading(true);
    setUsername('');
    console.log({ email, password, username, rib });
    // if (sign === 'signUp') {
    //   return signUp({ email, password, username, rib }, (res) => callBack(res));
    // }
    // await signIn({ email, password }, (res) => callBack(res));
  };

  const goTosignup = signinValidator(errors, ['password', 'email', 'username', 'rib']);

  const isNotEmptySignup = isNotEmpty(password) || isNotEmpty(email) || isNotEmpty(username) || isNotEmpty(rib);

  const isInvalidate = !(!isNotEmptySignup && !goTosignup);

  return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{}}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.body}>
            <View style={styles.titleContainer}>
              <Text style={styles.textPage}>{signTitle}</Text>
            </View>
            <View style={{}}>
              {<View style={styles.inputVew}>
                <Text style={styles.labelInput}>Type Compte</Text>
                <Modal />
                {/* <TextInput
                  placeholder="username"
                  value={username}
                  onChangeText={(value => setUsername(() => {
                    setMessage('');
                    setErrors({ ...errors, username: usernameValidator(value, 3) || [] });
                    return value;
                  }))}
                  style={styles.TextInput}
                /> */}
              </View>}
              <DisplyErrorComponet
                errors={errors.username}
                name='username'
              />
              {<View style={styles.inputVew}>
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
                <Text style={styles.labelInput}>Identifiants</Text>
                <TextInput
                  placeholder="email"
                  value={email}
                  onChangeText={(value => setEmail(() => {
                    setMessage('');
                    setErrors({ ...errors, email: usernameValidator(value, 5) || [] });
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
                onPress={async () => await createCompte()}
                title={signTitle}
                color={isInvalidate ? '#808080' : 'blue'}
                style={styles.btn}
              /> :
                <ActivityIndicator size={'large'} />}
            </View>
          </View>
        </ScrollView>
      </View>
  );
};

export default SignInScreen;
