import {
  ADD_NOTIFICATION,
  UPDATE_USER_DATA,
  SET_FETCH_STATUS,
  SET_LOGIN_STATUS,
  LOGOUT,
  LOGIN,
} from "../actioncreators";

const initialState = {
  userdata: {},
  notifications: [],
  fetchingData: {
    status: false,
    statusText: null,
  },
  isLoggedIn: false,
  loggingIn: false,
};

export default function rootReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return {
        ...newState,
        notifications: [
          ...state.notifications,
          {
            notification: action.notification,
            typeOfNotification: action.typeOfNotification,
            created: new Date().toISOString(),
          },
        ],
      };
    }

    case UPDATE_USER_DATA: {
      console.log(
        "🚀 ~ file: rootReducer.js ~ line 41 ~ rootReducer ~ action.userdata",
        action.userdata
      );
      return {
        ...newState,
        userdata: action.userdata,
      };
    }

    case SET_FETCH_STATUS: {
      return {
        ...newState,
        fetchingData: {
          status: action.fetchingData.status,
          statusText: action.fetchingData.statusText,
        },
      };
    }

    case SET_LOGIN_STATUS: {
      return {
        ...newState,
        loggingIn: action.status,
      };
    }

    case LOGIN: {
      return {
        ...newState,
        isLoggedIn: true,
      };
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
}
