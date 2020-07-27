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
import { auth, operation_trad } from '../../../config/constants';

const {
  usernameValidator,
  ribValidator,
  passwordValidator,
  emailValidator,
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
  const [sign, setSign] = React.useState(auth.sign);
  const [signTitle, setSignTitle] = React.useState(auth.signTitle);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const toogleSign = () => {
    setErrors({});
    setSign(sign === auth.sign ? auth.signUp : auth.sign);
    setSignTitle(sign === auth.sign ? auth.signupTitle : auth.signTitle);
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
    if (sign === auth.signUp && res && res.data && res.data._id) {
      toogleSign();
      setMessage(auth.succes);
    }
  };

  const toSignIn = async () => {
    setErrors({});
    setLoading(true);
    if (sign === auth.signUp) {
      return signUp({ email, password, username, rib }, (res) => callBack(res));
    }
    await signIn({ email, password }, (res) => callBack(res));
  };

  const isInvalidate = !(isNotEmpty(password) || isNotEmpty(email));

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
              {sign === auth.signUp && <View style={styles.inputVew}>
                <Text style={styles.labelInput}>{auth.username}</Text>
                <TextInput
                  placeholder={auth.username}
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
                name={auth.username}
              />
              {sign === auth.signUp && <View style={styles.inputVew}>
                <Text style={styles.labelInput}>{operation_trad.rib}</Text>
                <TextInput
                  placeholder={operation_trad.rib}
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
                name={operation_trad.rib}
              />
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>{auth.email}</Text>
                <TextInput
                  placeholder={auth.email}
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
                name={auth.email}
              />
              <View style={styles.inputVew}>
                <Text style={styles.labelInput}>{auth.password}</Text>
                <TextInput
                  placeholder={auth.password}
                  value={password}
                  onChangeText={(value => setPassword(() => {
                    setMessage('');
                    setErrors({ ...errors, password: passwordValidator(value) || [] });
                    return value;
                  }))}
                  secureTextEntry
                  style={styles.TextInput}
                  autoCompleteType={auth.password}
                />
              </View>
              <DisplyErrorComponet
                errors={errors.password}
                name={auth.password}
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
          </View>
        </ScrollView>
      </View>
  );
};

export default SignInScreen;
