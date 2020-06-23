import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {unarchiveNoteDispatch, deleteNoteDispatch} from '../Actions/dataAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OptionsMenu from 'react-native-options-menu';
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons';
import Drawer from './Drawer';

const ArchiveNotes = (props) => {
  const [animated, setAnimated] = useState(new Animated.Value(0));

  useEffect(() => {
    getAnimation();
  }, []);

  const getAnimation = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const unarchiveNote = async (id) => {
    const {unarchiveNoteDispatch} = props;
    await unarchiveNoteDispatch(id);
  };

  const deleteNote = async (id) => {
    const {deleteNoteDispatch} = props;
    await deleteNoteDispatch(id, props.route);
  };

  const Icon = <OptionIcon name="options" size={20} color="#000" />;  

  return props.notes === null ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size={40} color="#2f89fc" />
    </View>
  ) : props.notes.length >= 1 ? (
    <FlatList
      data={props.notes}
      renderItem={({item}) => (
        <ScrollView key={item._id}>
          <Animated.View
            style={[
              styles.animatedView,
              {
                transform: [
                  {
                    translateX: animated.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 1],
                    }),
                  },
                ],
              },
            ]}>
            <Checkbox.Android
              color="#2f89fc"
              status={item.done ? 'checked' : 'unchecked'}
            />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 30,
                textDecorationLine: item.done ? 'line-through' : 'none',
              }}>
              {item.body}
            </Text>
            <View style={{position: 'absolute', right: 15, top: 7}}>
              <OptionsMenu
                customButton={Icon}
                destructiveIndex={1}
                options={['Unarchive', 'Delete']}
                actions={[
                  () => unarchiveNote(item._id),
                  () => deleteNote(item._id),
                ]}
              />
            </View>
          </Animated.View>
        </ScrollView>
      )}
      keyExtractor={(item) => item._id}
    />
  ) : (
    <View style={styles.noNotesCont}>
      <Image
        style={{width: 550, height: 400}}
        source={require('../utils/error-404.png')}
      />
      <Text style={styles.noNotesText}>No notes found!</Text>
    </View>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      unarchiveNoteDispatch,
      deleteNoteDispatch,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ArchiveNotes);

const styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderBottomWidth: 0.5,
  },
  noNotesCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noNotesText: {
    fontSize: 25,
    marginTop: 5,
  },
});
