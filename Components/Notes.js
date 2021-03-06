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
import {Checkbox} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OptionsMenu from 'react-native-options-menu';
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
  deleteNoteDispatch,
  archiveNoteDispatch,
  markeNoteDoneDispatch,
  markeNoteUndoneDispatch,
  startEditNoteAction,
} from '../Actions/dataAction';
import EditNote from './EditNote';

const Notes = ({
  data: {editNote},
  notes,
  deleteNoteDispatch,
  archiveNoteDispatch,
  markeNoteDoneDispatch,
  markeNoteUndoneDispatch,
  startEditNoteAction,
  onComponentMount,
  route,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const deleteNote = async (id) => {
    await deleteNoteDispatch(id, route);
  };

  const archiveNote = async (id) => {
    await archiveNoteDispatch(id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onComponentMount();
    setRefreshing(false);
  };

  const Icon = <OptionIcon name="options" size={20} color="#000" />;

  return notes === null ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size={40} color="#2f89fc" />
    </View>
  ) : notes.length >= 1 ? (
    <>
      <FlatList
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <React.Fragment key={item._id}>
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={styles.container}>
                {editNote && editNote._id === item._id ? (
                  <View style={styles.noteView}>
                    <EditNote note={editNote} />
                  </View>
                ) : (
                  <View style={styles.noteView}>
                    <Checkbox.Android
                      color="#2f89fc"
                      status={item.done ? 'checked' : 'unchecked'}
                      onPress={
                        !item.done
                          ? () => markeNoteDoneDispatch(item._id, true)
                          : () => markeNoteUndoneDispatch(item._id, false)
                      }
                    />
                    <View style={styles.body}>
                      <Text
                        style={{
                          fontSize: 20,
                          marginLeft: 30,
                          textDecorationLine: item.done
                            ? 'line-through'
                            : 'none',
                          opacity: item.done ? 0.3 : 1,
                        }}>
                        {item.body}
                      </Text>
                    </View>
                    <View style={styles.optionMenu}>
                      <OptionsMenu
                        customButton={Icon}
                        destructiveIndex={1}
                        options={['Archive', 'Edit', 'Delete']}
                        actions={[
                          () => archiveNote(item._id),
                          () => startEditNoteAction(item._id),
                          () => deleteNote(item._id),
                        ]}
                      />
                    </View>
                  </View>
                )}
                <Text style={styles.createdAt}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            </ScrollView>
          </React.Fragment>
        )}
      />
    </>
  ) : (
    <View style={styles.noNotesCont}>
      <Image
        style={{width: 550, height: 400}}
        source={require('../utils/no-notes.png')}
      />
      <Text style={styles.noNotesText}>No notes found!</Text>
    </View>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteNoteDispatch,
      archiveNoteDispatch,
      markeNoteDoneDispatch,
      markeNoteUndoneDispatch,
      startEditNoteAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

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
  noteView: {
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
  noNotesCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionMenu: {
    position: 'absolute',
    right: 10,
    top: 0,
  },
  noNotesText: {
    fontSize: 25,
    marginVertical: 5,
  },
});
