export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export function newNotification(message, typeOfNotification) {
  // TODO: format Notifications
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}
