import {  MIGHT_WANT_CHILDREN_MATCH, HINDU_MATCH, 
   BUDDHIST_MATCH, JEW_MATCH, MUSLIM_MATCH, CHRISTIAN_MATCH, SOME_OTHER_RELIGION_MATCH, ATHIEST_MATCH, HAVE_CHILDREN_MATCH, WANT_CHILDREN_MATCH,
  I_DONT_KNOW_IF_I_WANT_CHILDREN_MATCH, ABOUT_ME_MATCH,AGE_MATCH, NAME_MATCH, GENDER_MATCH, LOCATION_MATCH
  , IMAGE5_MATCH, IMAGE4_MATCH, IMAGE3_MATCH, IMAGE2_MATCH, IMAGE1_MATCH, MATCH_USER_PERSONALITY_TYPE_MATCH,MATCH_USER,PUSH_TOKEN_MATCH,CLEAR_MATCHES, OWNER_MATCH
   ,MATCH_USER_ARRAY} from "../actions/matchAction";
 
 
 
 function matchPersonalDataReducer(state = [], action) {
     switch (action.type) {
      case MATCH_USER_ARRAY:
      return{...state,
      matchUserArray:action.matchUserArray}
      /*
       case CLEAR_MATCHES:
       return {...state};

       case PUSH_TOKEN_MATCH:
       return{
         ...state,
         pushTokenMatch:action.pushTokenMatch
       }
    
           case MATCH_USER:
           return{
             ...state,
             matchUserMatch:action.matchUserMatch
           }
 
  
 
 
           case HINDU_MATCH:
           return {
             ...state,
             hinduMatch: action.hinduMatch,
 
           };
           case BUDDHIST_MATCH:
           return {
             ...state,
             buddhistMatch: action.buddhistMatch,
 
           };
           case JEW_MATCH:
           return {
             ...state,
             jewMatch: action.jewMatch,
 
           };
           case MUSLIM_MATCH:
           return {
             ...state,
             muslimMatch: action.muslimMatch,
 
           };
 
           case CHRISTIAN_MATCH:
           return {
             ...state,
             christianMatch: action.christianMatch,
 
           };
           case SOME_OTHER_RELIGION_MATCH:
           return {
             ...state,
             someOtherReligionMatch: action.someOtherReligionMatch,
 
           };
 
           case ATHIEST_MATCH:
           return {
             ...state,
             athiestMatch: action.athiestMatch,
           };
 
 
 
           case HAVE_CHILDREN_MATCH:
           return {
             ...state,
             haveChildrenMatch: action.haveChildrenMatch,
 
           };
 
           case MIGHT_WANT_CHILDREN_MATCH:
           return {
             ...state,
             mightWantChildrenMatch: action.mightWantChildrenMatch,
 
           };
           case WANT_CHILDREN_MATCH:
           return {
             ...state,
             wantChildrenMatch: action.wantChildrenMatch,
 
           };
 
           case I_DONT_KNOW_IF_I_WANT_CHILDREN_MATCH:
           return {
             ...state,
             iDontKnowIfIWantChildrenMatch: action.iDontKnowIfIWantChildrenMatch,
           };
 
           case ABOUT_ME_MATCH:
           return {
             ...state,
             aboutMeMatch: action.aboutMeMatch,
 
           };

           case MATCH_USER_PERSONALITY_TYPE_MATCH:
           return {
             ...state,
             userPersonalityTypeMatch: action.userPersonalityTypeMatch,
 
           };
           case OWNER_MATCH:
           return {
             ...state,
             ownerMatch: action.ownerMatch,
 
           };
    
           case IMAGE1_MATCH:
           return {
             ...state,
             image1Match: action.image1Match,
 
           };
 
 
           case IMAGE2_MATCH:
           return {
             ...state,
             image2Match: action.image2Match,
 
           };
           case IMAGE3_MATCH:
           return {
             ...state,
             image3Match: action.image3Match,
 
           };
           case IMAGE4_MATCH:
           return {
             ...state,
             image4Match: action.image4Match
 
           };
           case IMAGE5_MATCH:
           return {
             ...state,
             image5Match: action.image5Match,
 
           };          
     

           
           case LOCATION_MATCH:
           return {
             ...state,
             locationMatch: action.locationMatch,
 
           };          
   
           case GENDER_MATCH:
           return {
             ...state,
             genderMatch: action.genderMatch,
 
           };          
           case NAME_MATCH:
           return {
             ...state,
             nameMatch: action.nameMatch,
 
           };
           case AGE_MATCH:
           return {
             ...state,
             ageMatch: action.ageMatch,
 
           };*/
           default:
           return state;
       }
 
     }
 
     export default matchPersonalDataReducer;    