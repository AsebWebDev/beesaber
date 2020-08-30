import { 
    ADD_NOTIFICATION, 
    UPDATE_USER_DATA,
    SET_FETCH_STATUS
  } from '../actioncreators';
  
  const initialState = {
      userdata: {},
      notifications: [],
      fetchingData: { 
        status: false,
        statusText: null
      }
  }
  
  export default function rootReducer(state=initialState, action) {
    let newState = { ...state }
    switch(action.type) {
  
      case ADD_NOTIFICATION: {
        return {
          ...newState,
          notifications: [...state.notifications, {
            notification: action.notification,
            typeOfNotification: action.typeOfNotification,
            created: new Date()
          }]
        }
      }

      case UPDATE_USER_DATA: {
        return {
          ...newState,
          userdata: action.userdata
        }
      }

      case SET_FETCH_STATUS: {
        return {
          ...newState,
          fetchingData: {
            status: action.fetchingData.status,
            text: action.fetchingData.text
          }
        }
      }
      
      default: return state;
    }
  }