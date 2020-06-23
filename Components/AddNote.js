import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TextInput, HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {addNoteDispatch, clearErrorAction} from '../Actions/dataAction';

const width = Dimensions.get('window').width;

const AddNote = (props) => {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    const {addNoteDispatch} = props;
    let newNote = {
      body: value,
    };
    await addNoteDispatch(newNote);
    setValue('');
  };

  const {
    data: {errors},
  } = props;

  setTimeout(() => {
    errors ? props.clearErrorAction() : null;
  }, 2000);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          mode="outlined"
          placeholder="Add a note"
          value={value}
          error={errors ? true : false}
          onChangeText={(text) => setValue(text)}
          theme={{colors: {primary: '#2f89fc'}}}
          style={styles.input}
        />
        {errors && <HelperText type="error">{errors.body}</HelperText>}
      </View>
      <Icon
        name="ios-add-circle"
        size={50}
        color="#2f89fc"
        style={{marginLeft: 10}}
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNoteDispatch,
      clearErrorAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  input: {
    width: width * 0.8,
    marginVertical: 10,
  },
});
