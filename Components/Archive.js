import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {getArchiveUserNotesDispatch} from '../Actions/dataAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Drawer from './Drawer';
import ArchiveNotes from './ArchiveNotes';

const Archive = (props) => {
  const {
    data: {archiveNotes},
    route: {name}
  } = props;

  useEffect(() => {
    const {getArchiveUserNotesDispatch} = props;
    const getArchiveNotes = async () => {
      await getArchiveUserNotesDispatch();
    };
    getArchiveNotes();
  }, []);  

  return (
    <>
      <Drawer navigation={props.navigation} />
      <ArchiveNotes notes={archiveNotes} route={name} />
    </>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getArchiveUserNotesDispatch,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Archive);

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
