import React, {useEffect} from 'react';
import {
  setAuthentication,
  getAuthUserDetailsDispatch,
  getUserNotesDispatch,
} from '../Actions/dataAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Notes from './Notes';
import Drawer from './Drawer';
import AddNote from './AddNote';

const Home = (props) => {
  const {
    data: {notes},
    route: {name},
  } = props;

  useEffect(() => {
    onComponentMount();
  }, []);

  const onComponentMount = async () => {
    const {getAuthUserDetailsDispatch, getUserNotesDispatch} = props;
    await getAuthUserDetailsDispatch();
    await getUserNotesDispatch();
  };

  return (
    <>
      <Drawer navigation={props.navigation} />
      <AddNote />
      <Notes notes={notes} route={name} />
    </>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthentication,
      getAuthUserDetailsDispatch,
      getUserNotesDispatch,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Home);
