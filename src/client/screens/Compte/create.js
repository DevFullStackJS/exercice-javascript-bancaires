import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { RibList } from '../Home';
import Modal from '../../components/Common/Modal';

import styles from './styles';

import validator from '../../../validator/users';

const { validatorUsers } = validator;

const signTitle = 'Creation Compte';

const DisplyErrorComponet = ({ errors, name }) => {
  if (!errors || !name) {
    return <View />;
  }
  return (
    <View style={styles.inputVew}>
      <Text style={styles.errorShow}>{errors}</Text>
    </View>
  );
};

const roles = (r) => (r === 1 ? 'Utilisateur' : 'Administrateur');

const ModalRole = ({ setRole, role }) => (
  <View>
    <Text style={styles.modalRoleTitle}>Rôle</Text>
    <View style={styles.modalRoleContaint}>
      <TouchableOpacity onPress={() => setRole(1)}>
        <Text style={[styles.modalRoleText, { backgroundColor: role === 1 ? 'beige' : 'white' }]}>{roles(1)}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.modalRoleContaint}>
      <TouchableOpacity onPress={() => setRole(2)}>
        <Text style={[styles.modalRoleText, { backgroundColor: role === 2 ? 'beige' : 'white' }]}>{roles(2)}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SignInScreen = (props) => {
  const { signUp, strictRIBList, setRIBId, selectedRIB } = props;
  const [email, setEmail] = React.useState('resdyyy3@body.email');
  const [password, setPassword] = React.useState('req1dd12.body.password');
  const [role, setRole] = React.useState(1);
  const [messageall, setMessage] = React.useState('');
  // const [rib, setRib] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [roleModal, setRoleModal] = React.useState(false);

  const callBack = (res) => {
    setRole(1);
    setLoading(false);
    if (res && res.error && res.error.message) {
      setMessage(res.error.message);
      return;
    }
    if (res && res.errors) {
      const toObjectErrors = res.errors.reduce((acc, { name, message }) => ({ ...acc, [name]: message }), {});
      setErrors(toObjectErrors);
      return;
    }
    if (res && res.data) {
      setMessage('Ajout avec success');
    }

  };

  const createCompte = async () => {
    setMessage('');
    const data = { email, password, role, rib: [selectedRIB] };
    const validators = validatorUsers(data);
    if (validators && validators.length > 0) {
      const toObjectErrors = validators.reduce((acc, { name, message }) => ({ ...acc, [name]: message }), {});
      setErrors(toObjectErrors);
    }
    await signUp(data, (res) => callBack(res));
  };

  console.log({ strictRIBList });

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
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Type Compte</Text>
              <View style={styles.modalInput}>
                <Text style={{ color: 'blue', margin: 10 }}>{roles(role)}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setRoleModal(true);
                  }}>
                  <Text style={{ margin: 10 }}>Modifier</Text>
                </TouchableOpacity>
              </View>
              {/* <Text style={{ color: 'blue', margin: 10 }}>{roles(role)}</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.labelInput}>Modifier</Text>
              </TouchableOpacity> */}
            </View>
            <DisplyErrorComponet
              errors={errors.role}
              name='role'
            />
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Rib</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setRoleModal(false);
                }}
                style={styles.TextInput}>
                <Text>{selectedRIB}</Text>
              </TouchableOpacity>
              {/* <TextInput
                placeholder="rib"
                value={selectedRIB}
                onFocus={() => {
                  setModalVisible(!modalVisible);
                  setRoleModal(false);
                }}
                // onChangeText={setRib}
                // onChangeText={(value => setRib(() => {
                //   setMessage('');
                //   setErrors({ ...errors, rib: ribValidator(value, 20) || [] });
                //   return value;
                // }))}
                style={styles.TextInput}
              /> */}
            </View>
            <DisplyErrorComponet
              errors={errors.rib}
              name='rib'
            />
            <View style={styles.inputVew}>
              <Text style={styles.labelInput}>Identifiant</Text>
              <TextInput
                placeholder="Identifiant"
                value={email}
                onChangeText={setEmail}
                // onChangeText={(value => setEmail(() => {
                //   setMessage('');
                //   setErrors({ ...errors, email: roleValidator(value, 5) || [] });
                //   return value;
                // }))}
                style={styles.TextInput}
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
                onChangeText={setPassword}
                // onChangeText={(value => setPassword(() => {
                //   setMessage('');
                //   setErrors({ ...errors, password: passwordValidator(value) || [] });
                //   return value;
                // }))}
                secureTextEntry
                style={styles.TextInput}
                autoCompleteType='password'
              />
            </View>
            <DisplyErrorComponet
              errors={errors.password}
              name='password'
            />
            <Text style={styles.messageShow}>{messageall}</Text>
          </View>
          <View>
            {!loading ? <Button
              // disabled={isInvalidate}
              onPress={async () => await createCompte()}
              title={signTitle}
              color={'blue'}
              style={styles.btn}
            /> :
              <ActivityIndicator size={'large'} />}
          </View>
          {/* <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          >
            {!roleModal
              ? <View style={{ flex: 1 }}>
                  <RibList
                    strictRIBList={strictRIBList}
                    setRIBId={setRIBId}
                  />
                </View>
              : <ModalRole setRole={setRole} role={role} />}
          </Modal> */}
        </View>

      </ScrollView>
      <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          {!roleModal
            ? <View style={{ flex: 1 }}>
                <RibList
                  strictRIBList={strictRIBList}
                  setRIBId={setRIBId}
                />
              </View>
            : <ModalRole setRole={setRole} role={role} />}
        </Modal>
    </View>
  );
};

export default SignInScreen;
