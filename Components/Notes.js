import React, {useEffect, useState} from 'react';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OptionsMenu from 'react-native-options-menu';
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
  deleteNoteDispatch,
  archiveNoteDispatch,
} from '../Actions/dataAction';

const Notes = ({
  notes,
  deleteNoteDispatch,
  archiveNoteDispatch,
  getArchiveUserNotesDispatch,
  route
}) => {
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

  const deleteNote = async (id) => {
    await deleteNoteDispatch(id, route);
  };

  const archiveNote = async (id) => {
    await archiveNoteDispatch(id);
  };

  const Icon = <OptionIcon name="options" size={20} color="#000" />;

  console.log(route);
  

  return notes === null ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size={40} color="#2f89fc" />
    </View>
  ) : notes.length >= 1 ? (
    <>
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <React.Fragment key={item._id}>
            <ScrollView>
              <TouchableOpacity activeOpacity={0.5}>
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
                      options={['Archive', 'Delete']}
                      actions={[
                        () => archiveNote(item._id),
                        () => deleteNote(item._id),
                      ]}
                    />
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </ScrollView>
          </React.Fragment>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
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
      deleteNoteDispatch,
      archiveNoteDispatch,
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
