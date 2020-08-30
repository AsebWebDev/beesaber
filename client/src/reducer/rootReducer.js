import { 
    ADD_NOTIFICATION, 
    UPDATE_USER_DATA,
  } from '../actioncreators';
  
  const initialState = {
      userdata: {},
      notifications: [],
      userDataNeedsRefresh: false,
      beesDataNeedsReresh: false
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
      
      default: return state;
    }
  }