export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const SET_FETCH_STATUS = "SET_FETCH_STATUS";

export function newNotification(message, typeOfNotification) {
  // TODO: format Notifications
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}

export function setFetchStatus(status, text) {
  return {
    type: SET_FETCH_STATUS,
    fetchingData: {
      status,
      text
    }
  }
}
