export const GET_DATA = "GET_DATA";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export function newNotification(message, typeOfNotification) {
  return {
    type: ADD_NOTIFICATION,
    notification: message,
    typeOfNotification
  }
}
