import React, {useEffect} from 'react';
import {getArchiveUserNotesDispatch} from '../Actions/dataAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Drawer from './Drawer';
import ArchiveNotes from './ArchiveNotes';

const Archive = (props) => {
  const {
    data: {archiveNotes},
    route: {name},
  } = props;

  useEffect(() => {
    onComponentMount();
  }, []);

  const onComponentMount = async () => {
    const {getArchiveUserNotesDispatch} = props;
    await getArchiveUserNotesDispatch();
  };

  return (
    <>
      <Drawer navigation={props.navigation} />
      <ArchiveNotes
        notes={archiveNotes}
        route={name}
        onComponentMount={onComponentMount}
      />
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
