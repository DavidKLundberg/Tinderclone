export const CHAT_MESSAGE = "CHAT_MESSAGE";
export const REMOVE_CHAT_USER_MESSAGES= "REMOVE_CHAT_USER_MESSAGES"; 
export const CHAT_MESSAGE_ARRAY = "CHAT_MESSAGE_ARRAY";

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
                roomNumber: 6
              },
              index:6
            }
 * 
 * 
 * 
 */

export function chatMessage(chatMsg) {
  return {
    type: "CHAT_MESSAGE",
    chatMsg
  };
}
export function removeChatUserMessages(removeChatUserMessages){
  return{type:"REMOVE_CHAT_USER_MESSAGES", removeChatUserMessages}
}
export function chatMessageArray(chatMessageArray) {
  return { type: "CHAT_MESSAGE_ARRAY", chatMessageArray };
}
