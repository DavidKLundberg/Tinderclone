import {
    CHAT_MESSAGE,
    CHAT_MESSAGE_ARRAY,
    REMOVE_CHAT_USER_MESSAGES
  } from "../actions/chatMessageAction";
  
  function chatMessageArray(state = [], action) {
    switch (action.type) {
   
     
      case CHAT_MESSAGE_ARRAY:
      return{
        ...state,
        [action.chatMessageArray.index]:action.chatMessageArray.messages
      }
      case CHAT_MESSAGE:
        return{
          ...state,
          [action.chatMsg.index]:[...state[action.chatMsg.index],action.chatMsg.message]
        }
      case REMOVE_CHAT_USER_MESSAGES:


        let index = action.removeChatUserMessages
        const {[index]:value, ...rest} = state
          return rest
    

      default:
        return state;
    }
  }
  /**
   * 
   *    case CHAT_USER:
        return {
          ...state,
          chatUserArray: action.chatUser.index,
        :action.chatUser.user
        };
  
   */
  
  export default chatMessageArray;
  
  
  