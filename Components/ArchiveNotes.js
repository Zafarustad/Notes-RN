import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {unarchiveNoteDispatch, deleteNoteDispatch} from '../Actions/dataAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OptionsMenu from 'react-native-options-menu';
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons';

const ArchiveNotes = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const unarchiveNote = async (id) => {
    const {unarchiveNoteDispatch} = props;
    await unarchiveNoteDispatch(id);
  };

  const deleteNote = async (id) => {
    const {deleteNoteDispatch} = props;
    await deleteNoteDispatch(id, props.route);
  };

  const onRefresh = async () => {
    const {onComponentMount} = props;
    setRefreshing(true);
    await onComponentMount();
    setRefreshing(false);
  };

  const Icon = <OptionIcon name="options" size={20} color="#000" />;

  return props.notes === null ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size={40} color="#2f89fc" />
    </View>
  ) : props.notes.length >= 1 ? (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
      data={props.notes}
      renderItem={({item}) => (
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.container}>
            <View style={styles.NoteView}>
              <View style={styles.body}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 30,
                    textDecorationLine: item.done ? 'line-through' : 'none',
                    opacity: item.done ? 0.3 : 1,
                  }}>
                  {item.body}
                </Text>
              </View>
              <View style={styles.optionMenu}>
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
            </View>
            <Text style={styles.createdAt}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        </ScrollView>
      )}
      keyExtractor={(item) => item._id}
    />
  ) : (
    <View style={styles.noNotesCont}>
      <Image
        style={{width: 550, height: 400}}
        source={require('../utils/no-archive.png')}
      />
      <Text style={styles.noNotesText}>No Archived Notes!</Text>
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
  container: {
    borderBottomWidth: 0.5,
    margin: 10,
  },
  NoteView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  body: {
    width: Dimensions.get('window').width * 0.8,
    marginVertical: 10,
  },
  createdAt: {
    color: 'grey',
    fontSize: 12,
    position: 'absolute',
    marginTop: 5,
    right: 0,
    bottom: 0,
  },
  optionMenu: {
    position: 'absolute',
    right: 10,
    top: 0,
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
