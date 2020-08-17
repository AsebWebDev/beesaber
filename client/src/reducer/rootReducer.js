import { 
    GET_DATA, 
    ADD_NOTIFICATION, 
    UPDATE_USER_DATA,
  } from '../actioncreators';
  
  const initialState = {
      username: null,
      profilePic: '' 
  }
  
  export default function rootReducer(state=initialState, action) {
    let newState = { ...state }
    switch(action.type) {
      case GET_DATA: {
        return {
          ...newState,
          collections: action.collections
        };
      }
  
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
          username: action.userdata.username,
          profilePic: action.userdata.profilePic
        }
      }
      
      default: return state;
    }
  }