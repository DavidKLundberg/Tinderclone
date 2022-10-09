export const CHAT_USER = "CHAT_USER";
export const CHAT_UNUSED_USER = "CHAT_UNUSED_USER";
export const REMOVE_CHAT_USER ="REMOVE_CHAT_USER"
export const REMOVE_UNUSED_CHAT_USER= "REMOVE_UNUSED_CHAT_USER"
export const CHAT_USER_ARRAY = "CHAT_USER_ARRAY";
export const SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE"
/** chatmessage
 * important part is msg and index, index needs to be 
 * roomnumber and those names are fixed. rest is flexible
 * let payload = {
               msg:{
                 sender:123,
                 timestamp:123,
                 message:123
               },
               index:6
             }
 */
/**chatuser important parts are user and index, 
 * index needs to be room number and user needs to be named user
 * rest is flexible
 *               let payload={
              user:{
                name: "ssssd",
                image1:
          null,
                roomNumber: 
              },
              index:6
            }
 * 
 * 
 * 
 */
export function sendChatMessage(sendChatMessage){
  return{
    type:"SEND_CHAT_MESSAGE",
    sendChatMessage
  }
}
export function removeUnusedChatUser(removeUnusedChatUser){
  return{
    type:"REMOVE_UNUSED_CHAT_USER",
    removeUnusedChatUser
  }
}
export function removeChatUser(removeChatUser){
  return{
    type:"REMOVE_CHAT_USER",
    removeChatUser
  }
}
export function chatUser(chatUser) {
  return {
    type: "CHAT_USER",
    chatUser
  };
}
export function chatUnUsedUser(chatUnUsedUser){
  return{
    type:"CHAT_UNUSED_USER",
    chatUnUsedUser,
  }
}
export function chatUserArray(chatUserArray) {
  return {
    type: "CHAT_USER_ARRAY",
    chatUserArray
  };
}