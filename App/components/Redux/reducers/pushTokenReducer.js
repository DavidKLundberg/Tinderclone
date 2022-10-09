import { PUSH_TOKEN_ID } from "../actions/pushTokenAction";


function pushTokenReducer(state = {}, action) {
    switch (action.type) {
   
      case PUSH_TOKEN_ID:
      return{
        ...state,
        pushTokenId: action.pushTokenId
      }
    
    default:
    return state;
}

}

export default pushTokenReducer;    