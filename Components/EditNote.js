import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SaveIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {cancelEditAction, editNoteDispatch} from '../Actions/dataAction';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditNote = ({note, cancelEditAction, editNoteDispatch}) => {
  const [value, setValue] = useState(note.body);

  const editNote = async () => {
    let data = {
      body: value,
    };
    await editNoteDispatch(note._id, data);
  };

  return (
    <View style={{display: 'flex'}}>
      <CloseIcon
        name="close"
        size={20}
        style={{position: 'absolute', right: -5, top: 0}}
        onPress={() => cancelEditAction()}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <TextInput
          style={{
            width: '90%',
            backgroundColor: 'transparent',
            marginRight: 5,
            fontSize: 20,
          }}
          theme={{colors: {primary: '#2f89fc'}}}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => editNote()}>
          <SaveIcon name="content-save" size={30} color="#2f89fc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      cancelEditAction,
      editNoteDispatch,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(EditNote);
