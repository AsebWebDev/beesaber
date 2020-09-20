export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const SET_FETCH_STATUS = "SET_FETCH_STATUS";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function newNotification(message, typeOfNotification) {
  // TODO: format Notifications
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}

export function setFetchStatus(status, statusText) {
  return {
    type: SET_FETCH_STATUS,
    fetchingData: {
      status,
      statusText
    }
  }
}

export function setLoginStatus(status) {
  return {
    type: SET_LOGIN_STATUS,
    status
  }
}

