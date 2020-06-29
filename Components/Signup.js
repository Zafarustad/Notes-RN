import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {signupUserDispatch, clearErrorAction} from '../Actions/dataAction';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Signup = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
    loading: false,
  });

  useEffect(() => {
    const {clearErrorAction} = props;
    clearErrorAction();

    return () => {
      goToLogin();
    };
  }, []);

  const handleSubmit = async () => {
    const {signupUserDispatch} = props;
    let data = {
      email: state.email,
      password: state.password,
      username: state.username,
    };
    setState({...state, loading: true});
    await signupUserDispatch(data);
    setState({...state, loading: false});
  };

  const goToLogin = async () => {
    const {navigation, clearErrorAction} = props;
    await clearErrorAction();
    navigation.navigate('Login');
  };

  const {
    data: {errors},
  } = props;
  return (
    <>
      <ScrollView keyboardShouldPersistTaps='always'>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.form}>
            <Image
              style={{width: 250, height: 100}}
              source={require('../utils/notes-logo.png')}
            />
            <TextInput
              style={styles.textInput}
              label="Email"
              value={state.email}
              onChangeText={(text) => setState({...state, email: text})}
              underlineColor="transparent"
              error={errors && errors.email ? true : false}
              theme={{colors: {primary: '#2f89fc'}}}
            />
            {errors && errors.email ? (
              <View style={styles.helperText}>
                <HelperText type="error">{errors.email}</HelperText>
              </View>
            ) : null}
            <TextInput
              style={styles.textInput}
              label="Password"
              value={state.password}
              onChangeText={(text) => setState({...state, password: text})}
              underlineColor="transparent"
              secureTextEntry={true}
              error={errors && errors.password ? true : false}
              theme={{colors: {primary: '#2f89fc'}}}
            />
            {errors && errors.password ? (
              <View style={styles.helperText}>
                <HelperText type="error">{errors.password}</HelperText>
              </View>
            ) : null}
            <TextInput
              style={styles.textInput}
              label="Username"
              value={state.username}
              onChangeText={(text) => setState({...state, username: text})}
              underlineColor="transparent"
              error={errors && errors.username ? true : false}
              theme={{colors: {primary: '#2f89fc'}}}
            />
            {errors && errors.username ? (
              <View style={styles.helperText}>
                <HelperText type="error">{errors.username}</HelperText>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.5}>
              <Button
                style={styles.button}
                disabled={state.loading ? true : false}
                mode="contained">
                Sign up
              </Button>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => goToLogin()} activeOpacity={0.5}>
            <Text style={styles.bottomText}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signupUserDispatch,
      clearErrorAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: '35%',
  },
  headerText: {
    fontSize: 30,
    marginLeft: 5,
    color: '#000',
  },
  textInput: {
    width: width * 0.85,
    marginVertical: 10,
    height: 60,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: '#f3f4f7',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2f89fc',
    width: width * 0.8,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  bottomText: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 45,
  },
  helperText: {
    position: 'relative',
    left: 0,
    width: width * 0.9,
  },
});
