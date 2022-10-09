import {
  CHAT_MESSAGE,
  CHAT_USER,
  CHAT_USER_ARRAY,
  CHAT_UNUSED_USER,
  REMOVE_CHAT_USER,
  REMOVE_UNUSED_CHAT_USER,
  SEND_CHAT_MESSAGE
} from "../actions/chatRoomAction";

function chatRoomReducer(state = [], action) {
  switch (action.type) {
 
    case CHAT_USER:
    return{
      ...state,
      [action.chatUser.index]:action.chatUser.user
    }
 
    case REMOVE_CHAT_USER:
    let index = action.removeChatUser
    const {[index]:value, ...rest} = state
      return rest


    default:
      return state;
  }
  
}
/**
 * 
 *  /*  case CHAT_USER_ARRAY:
    return{
      ...state,
      chatUserArray: action.chatUserArray
    }
    case CHAT_UNUSED_USER:
    return{
      ...state,
      chatUnUsedUserArray:[...state.chatUnUsedUserArray,action.chatUnUsedUser]

    }
 * 
 *   case REMOVE_UNUSED_CHAT_USER:
    return{
      ...state,
      chatUnUsedUserArray:[...state.chatUnUsedUserArray.slice(0,action.chatUnUsedUser),...state.chatUnUsedUserArray.slice(action.chatUnUsedUser+1)]

    }
 * 
 *     /*
    case SEND_CHAT_MESSAGE:
      return{
        ...state,
        *
      }
 * 
 *    case CHAT_USER:
      return {
        ...state,
        chatUserArray: action.chatUser.index,
      :action.chatUser.user
      };

 */
export default chatRoomReducer;


