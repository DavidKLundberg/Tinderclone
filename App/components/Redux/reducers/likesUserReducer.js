import { LIKES_USER_ARRAY, REMOVE_FROM_LIKES } from "../actions/likesUserAction";

 
 function matchPersonalDataReducer(state = [], action) {
    switch (action.type) {
     case LIKES_USER_ARRAY:
     return{...state,
        likesUserArray:action.likesUserArray}
      case REMOVE_FROM_LIKES:
      let index = action.removeChatUser
      const {[index]:value, ...rest} = state
        return rest
  
     default:
     return state;
 }

}

export default matchPersonalDataReducer;    