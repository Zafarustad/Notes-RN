import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {loginUserDispatch, clearErrorAction} from '../Actions/dataAction';

const width = Dimensions.get('window').width;

const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false,
  });

  useEffect(() => {
    const {clearErrorAction} = props;
    clearErrorAction();
    setState({
      ...state,
      email: '',
      password: '',
      loading: false,
    });

    return () => {
      clearErrorAction();
      setState({
        ...state,
        email: '',
        password: '',
        loading: false,
      });
    };
  }, []);

  const handleSubmit = async () => {
    const {loginUserDispatch} = props;
    let data = {
      email: state.email,
      password: state.password,
    };
    setState({...state, loading: true});
    await loginUserDispatch(data);
    setState({...state, loading: false});
  };
  const {
    data: {errors},
  } = props;
  return (
    <>
      <ScrollView keyboardShouldPersistTaps='always'>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.form}>
            {/* <Text style={styles.headerText}>Notes</Text> */}
            <Image
              style={{width: 250, height: 100}}
              source={require('../utils/notes-logo.png')}
            />
            {errors && errors.general ? (
              <View
                style={{
                  width: width * 0.9,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <HelperText type="error">{errors.general}</HelperText>
              </View>
            ) : null}
            <TextInput
              style={styles.textInput}
              value={state.email}
              label="Email"
              onChangeText={(text) => setState({...state, email: text})}
              error={errors && errors.email ? true : false}
              underlineColor="transparent"
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
              error={errors && errors.password ? true : null}
              underlineColor="transparent"
              theme={{colors: {primary: '#2f89fc'}}}
              secureTextEntry={true}
            />
            {errors && errors.password ? (
              <View style={styles.helperText}>
                <HelperText type="error">{errors.password}</HelperText>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.5}>
              <Button
                disabled={state.loading ? true : false}
                style={styles.button}
                mode="contained">
                Log in
              </Button>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signup')}
            activeOpacity={0.5}>
            <Text style={styles.bottomText}>New here? Sign up</Text>
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
      loginUserDispatch,
      clearErrorAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: '45%',
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
