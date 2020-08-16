import { 
    GET_DATA, 
    ADD_NOTIFICATION, 
  } from '../actioncreators';
  
  const initialState = {
    
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
      
      default: return state;
    }
  }