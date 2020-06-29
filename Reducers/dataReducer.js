import {
  LOGOUT_USER,
  TRIGGER_ERROR,
  CLEAR_ERROR,
  SET_AUTHETICATION,
  AUTH_USER_DETAILS,
  USER_NOTES,
  USER_ARCHIVE_NOTES,
  ADD_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_NOTE,
  SUCCESS_MESSAGE,
  NOTE_DONE,
  NOTE_UNDONE,
  START_EDIT_NOTE,
  EDIT_NOTE,
  CANCEL_EDIT,
} from '../Actions/dataAction';

const initailState = {
  authenticated: null,
  credentials: {},
  notes: null,
  editNote: null,
  archiveNotes: null,
  errors: null,
  successMessage: null,
  errorMessage: null,
};

const dataReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return {
        ...state,
        notes: null,
        archiveNotes: null,
      };
    }
    case TRIGGER_ERROR: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        errors: null,
      };
    }

    case SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: action.payload,
      };
    }
    case SET_AUTHETICATION: {
      return {
        ...state,
        authenticated: action.payload,
      };
    }
    case AUTH_USER_DETAILS: {
      return {
        ...state,
        credentials: action.payload,
      };
    }
    case USER_NOTES: {
      return {
        ...state,
        notes: action.payload,
      };
    }
    case USER_ARCHIVE_NOTES: {
      return {
        ...state,
        archiveNotes: action.payload,
      };
    }
    case ADD_NOTE: {
      return {
        ...state,
        notes: [action.payload.data, ...state.notes],
      };
    }
    case ARCHIVE_NOTE: {
      const filteredNotes = state.notes.filter(
        (note) => note._id !== action.payload,
      );
      return {
        ...state,
        notes: filteredNotes,
      };
    }

    case UNARCHIVE_NOTE: {
      const filteredNotes = state.archiveNotes.filter(
        (note) => note._id !== action.payload,
      );
      return {
        ...state,
        archiveNotes: filteredNotes,
      };
    }

    case DELETE_NOTE: {
      const filteredNotes =
        action.payload.route === 'Archive'
          ? state.archiveNotes.filter((note) => note._id !== action.payload.id)
          : state.notes.filter((note) => note._id !== action.payload.id);
      return action.payload.route === 'Archive'
        ? {
            ...state,
            archiveNotes: filteredNotes,
          }
        : {
            ...state,
            notes: filteredNotes,
          };
    }

    case NOTE_DONE: {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload.id,
      );
      state.notes[index].done = action.payload.value;

      return {
        ...state,
      };
    }
    case NOTE_UNDONE: {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload.id,
      );
      state.notes[index].done = action.payload.value;

      return {
        ...state,
      };
    }

    case START_EDIT_NOTE: {
      const editingNote = state.notes.find(
        (note) => note._id === action.payload,
      );
      return {
        ...state,
        editNote: editingNote,
      };
    }

    case EDIT_NOTE: {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id,
      );
      state.notes[index].body = action.payload.body;      
      return {
        ...state,
      };
    }

    case CANCEL_EDIT: {
      return {
        ...state,
        editNote: null,
      };
    }

    default:
      return state;
  }
};

export default dataReducer;
