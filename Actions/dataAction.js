import axios from 'axios';
import {setAsyncStorageToken} from '../utils/utils';

export const TRIGGER_ERROR = 'TRIGGER_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
export const SET_AUTHETICATION = 'SET_AUTHETICATION';
export const AUTH_USER_DETAILS = 'AUTH_USER_DETAILS';
export const USER_NOTES = 'USER_NOTES';
export const USER_ARCHIVE_NOTES = 'USER_ARCHIVE_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
export const UNARCHIVE_NOTE = 'UNARCHIVE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

const uri = process.env.REACT_APP_API_ENDPOINT;

export const triggerErrorAction = (data) => ({
  type: TRIGGER_ERROR,
  payload: data,
});

export const clearErrorAction = () => ({
  type: CLEAR_ERROR,
});

export const setAuthentication = (data) => ({
  type: SET_AUTHETICATION,
  payload: data,
});

export const triggorSuccessMessage = (data) => ({
  type: SUCCESS_MESSAGE,
  payload: data,
});

export const getAuthUserDetailsAction = (data) => ({
  type: AUTH_USER_DETAILS,
  payload: data,
});

export const getUserNotesAction = (data) => ({
  type: USER_NOTES,
  payload: data,
});

export const getArchiveUserNotesAction = (data) => ({
  type: USER_ARCHIVE_NOTES,
  payload: data,
});

export const addNoteAction = (data) => ({
  type: ADD_NOTE,
  payload: data,
});

export const archiveNoteAction = (data) => ({
  type: ARCHIVE_NOTE,
  payload: data,
});

export const unarchiveNoteAction = (data) => ({
  type: UNARCHIVE_NOTE,
  payload: data,
});

export const deleteNoteAction = (data) => ({
  type: DELETE_NOTE,
  payload: data,
});

export const signupUserDispatch = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${uri}/signup`, data);
    await setAsyncStorageToken(res.data.token);
    dispatch(setAuthentication(true));
  } catch (err) {
    console.log(err.response.data);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const loginUserDispatch = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${uri}/login`, data);
    await setAsyncStorageToken(res.data.token);
    dispatch(setAuthentication(true));
  } catch (err) {
    console.log(err.response.data);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const getAuthUserDetailsDispatch = () => async (dispatch) => {
  try {
    const res = await axios.get(`${uri}/user`);
    dispatch(getAuthUserDetailsAction(res.data));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getUserNotesDispatch = () => async (dispatch) => {
  try {
    const res = await axios.get(`${uri}/note`);
    dispatch(getUserNotesAction(res.data));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getArchiveUserNotesDispatch = () => async (dispatch) => {
  try {
    const res = await axios.get(`${uri}/archive/note`);
    dispatch(getArchiveUserNotesAction(res.data));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const addNoteDispatch = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${uri}/note`, data);
    dispatch(addNoteAction(res.data));
  } catch (err) {
    console.log(err.response.data);
    dispatch(triggerErrorAction(err.response.data));
  }
};

export const archiveNoteDispatch = (id) => async (dispatch) => {
  try {
    dispatch(archiveNoteAction(id));
    await axios.put(`${uri}/archive/${id}`);
    await dispatch(getArchiveUserNotesDispatch());
    dispatch(triggorSuccessMessage('Note Archived!'));
    setTimeout(() => {
      dispatch(triggorSuccessMessage(null));
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};

export const unarchiveNoteDispatch = (id) => async (dispatch) => {
  try {
    await dispatch(unarchiveNoteAction(id));
    await axios.put(`${uri}/unarchive/${id}`);
    await dispatch(getUserNotesDispatch());
    dispatch(triggorSuccessMessage('Note Unarchived!'));
    setTimeout(() => {
      dispatch(triggorSuccessMessage(null));
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};

export const deleteNoteDispatch = (id, route) => async (dispatch) => {
  try {
    let data = {id, route};
    dispatch(deleteNoteAction(data));
    await axios.delete(`${uri}/note/${id}`);
    dispatch(triggorSuccessMessage('Note Deleted!'));
    setTimeout(() => {
      dispatch(triggorSuccessMessage(null));
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};
