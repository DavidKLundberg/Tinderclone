import {  MIGHT_WANT_CHILDREN, HINDU, 
  BUDDHIST, JEW, MUSLIM, CHRISTIAN, SOME_OTHER_RELIGION, ATHIEST, HAVE_CHILDREN, WANT_CHILDREN,
 I_DONT_KNOW_IF_I_WANT_CHILDREN,INTERESTED_IN_FEMALE, OWNER, ABOUT_ME,AGE, NAME, RADIUS, LOCATION,
 HAS_USER_PAYED, INTERESTED_IN_MALE, IMAGE5, IMAGE4, IMAGE3, IMAGE2, IMAGE1, AGE_OF_INTEREST, USER_PERSONALITY_TYPE
 ,PARTNER_PERSONALITY_TYPE_ONE,ID,
  PARTNER_ITERATOR, CHOSEN_LANGUAGE,
PUSH_TOKEN,PERSONALITY_FILTER, FILTER_OUT_FREE_USERS,USER_LOGOUT, IS_FEMALE, STORE_HAS_CHANGED, BIRTHDAY, INTERESTED_IN_OTHER ,GENDER,
 IMAGE_ARRAY, ADD_IMAGE_TO_ARRAY, REMOVE_IMAGE_FROM_ARRAY, PERSONAL_VALUES,





 USER_EXTRAVERSION ,
 USER_NEUROTIC,
 USER_AGREEABLE,
 USER_OPENNESS,
 USER_CONSCIENTIOUS ,

 USER_EXTRAVERSION_QUESTION_ANSWERED ,
 USER_NEUROTIC_QUESTION_ANSWERED,
 USER_AGREEABLE_QUESTION_ANSWERED,
 USER_OPENNESS_QUESTION_ANSWERED ,
 USER_CONSCIENTIOUS_QUESTION_ANSWERED ,

 PARTNER_EXTRAVERSION ,
 PARTNER_NEUROTIC ,
 PARTNER_AGREEABLE ,
 PARTNER_OPENNESS ,
 PARTNER_CONSCIENTIOUS ,

 PARTNER_EXTRAVERSION_QUESTION_ANSWERED ,
 PARTNER_NEUROTIC_QUESTION_ANSWERED ,
 PARTNER_AGREEABLE_QUESTION_ANSWERED ,
 PARTNER_OPENNESS_QUESTION_ANSWERED ,
 PARTNER_CONSCIENTIOUS_QUESTION_ANSWERED ,




ADD_IMAGE_ID_TO_ARRAY,
REMOVE_IMAGE_ID_FROM_ARRAY,
 IMAGE_ID_ARRAY 
 } from "../actions/personalAction";

function personalDataReducer(state = {}, action) {
    switch (action.type) {
   
      case PERSONAL_VALUES:
      return{
        ...state,
        personalValues: action.personalValues
      }





      case USER_EXTRAVERSION:
        return{
          ...state,
          userExtraversion: action.userExtraversion
        }
      case USER_NEUROTIC:
        return{
          ...state,
          userNeurotic: action.userNeurotic
        }
      case USER_AGREEABLE:
        return{
          ...state,
          userAgreeable: action.userAgreeable
        }
      case USER_OPENNESS:
        return{
          ...state,
          userOpenness: action.userOpenness
        }
      case USER_CONSCIENTIOUS :
        return{
          ...state,
          userConscientious: action.userConscientious
        }
      case USER_EXTRAVERSION_QUESTION_ANSWERED :
        return{
          ...state,
          userExtraversionQuestionAnswered: action.userExtraversionQuestionAnswered
        }
      case USER_NEUROTIC_QUESTION_ANSWERED:
        return{
          ...state,
          userNeuroticQuestionAnswered: action.userNeuroticQuestionAnswered
        }
      case USER_AGREEABLE_QUESTION_ANSWERED:
        return{
          ...state,
          userAgreeableQuestionAnswered: action.userAgreeableQuestionAnswered
        }
      case USER_OPENNESS_QUESTION_ANSWERED :
        return{
          ...state,
          userOpennessQuestionAnswered: action.userOpennessQuestionAnswered
        }
      case USER_CONSCIENTIOUS_QUESTION_ANSWERED :
        return{
          ...state,
          userConscientiousQuestionAnswered: action.userConscientiousQuestionAnswered
        }
      case PARTNER_EXTRAVERSION :
        return{
          ...state,
          partnerExtraversion: action.partnerExtraversion
        }
      case PARTNER_NEUROTIC :
        return{
          ...state,
          partnerNeurotic: action.partnerNeurotic
        }
      case PARTNER_AGREEABLE:
        return{
          ...state,
          partnerAgreeable: action.partnerAgreeable
        }
      case PARTNER_OPENNESS:
        return{
          ...state,
          partnerOpenness: action.partnerOpenness
        }
      case PARTNER_CONSCIENTIOUS:
        return{
          ...state,
          partnerConscientious: action.partnerConscientious
        }
      case PARTNER_EXTRAVERSION_QUESTION_ANSWERED:
        return{
          ...state,
          partnerExtraversionQuestionAnswered: action.partnerExtraversionQuestionAnswered
        }
      case PARTNER_NEUROTIC_QUESTION_ANSWERED:
        return{
          ...state,
          partnerNeuroticQuestionAnswered: action.partnerNeuroticQuestionAnswered
        }
      case PARTNER_AGREEABLE_QUESTION_ANSWERED:
        return{
          ...state,
          partnerAgreeableQuestionAnswered: action.partnerAgreeableQuestionAnswered
        }
      case PARTNER_OPENNESS_QUESTION_ANSWERED:
        return{
          ...state,
          partnerOpennessQuestionAnswered: action.partnerOpennessQuestionAnswered
        }
      case PARTNER_CONSCIENTIOUS_QUESTION_ANSWERED:
        return{
          ...state,
          partnerConscientiousQuestionAnswered: action.partnerConscientiousQuestionAnswered
        }







 
      case IMAGE_ARRAY:
      return{
        ...state,
        imageArray: action.imageArray
      }
      case ADD_IMAGE_TO_ARRAY:
      
      return {
        ...state,
        imageArray: [...state.imageArray,
             action.addImageToArray]
      };
      case REMOVE_IMAGE_FROM_ARRAY:
      return{
        ...state,
        imageArray:[...state.imageArray.slice(0,action.removeImageFromArray),...state.imageArray.slice(action.removeImageFromArray+1)]
      }
      case IMAGE_ID_ARRAY:
      return{
        ...state,
        imageIdArray: action.imageIdArray
      }
      case ADD_IMAGE_ID_TO_ARRAY:
      
      return {
        ...state,
        imageIdArray: [...state.imageIdArray,
             action.addImageIdToArray]
      };
      case REMOVE_IMAGE_ID_FROM_ARRAY:
      return{
        ...state,
        imageIdArray:[...state.imageIdArray.slice(0,action.removeImageIdFromArray),...state.imageIdArray.slice(action.removeImageIdFromArray+1)]
      }
      case FILTER_OUT_FREE_USERS:
      return{
        ...state,
        filterOutFreeUsers: action.filterOutFreeUsers
      }
      case INTERESTED_IN_OTHER:
      return{
        ...state,
        interestedInOther: action.interestedInOther
      }
      case GENDER:
      return{
        ...state,
        gender: action.gender
      }
      case CHOSEN_LANGUAGE:
        return{
          ...state,
           nguage: action. nguage
        }
      case BIRTHDAY:
      return{
        ...state,
        birthday: action.birthday
      }
      case USER_LOGOUT:
    return {...state};

      case PERSONALITY_FILTER:
      return{
        ...state,
        personalityFilter :action.personalityFilter
      }
       
          case ID:{
            return{
              ...state,
              id:action.id
            }
          }
      case STORE_HAS_CHANGED:
      return{
        ...state,
        storeHasChanged: action.storeHasChanged
      }


          case PUSH_TOKEN:
          return {
            ...state,
            pushToken:action.pushToken,
          }
         
          case HINDU:
          return {
            ...state,
            hindu: action.hindu,

          };
          case BUDDHIST:
          return {
            ...state,
            buddhist: action.buddhist,

          };
          case JEW:
          return {
            ...state,
            jew: action.jew,

          };
          case MUSLIM:
          return {
            ...state,
            muslim: action.muslim,

          };

          case CHRISTIAN:
          return {
            ...state,
            christian: action.christian,

          };
          case SOME_OTHER_RELIGION:
          return {
            ...state,
            someOtherReligion: action.someOtherReligion,

          };

          case ATHIEST:
          return {
            ...state,
            athiest: action.athiest,
          };

          case HAVE_CHILDREN:
          return {
            ...state,
            haveChildren: action.haveChildren,

          };

          case MIGHT_WANT_CHILDREN:
          return {
            ...state,
            mightWantChildren: action.mightWantChildren,

          };
          case WANT_CHILDREN:
          return {
            ...state,
            wantChildren: action.wantChildren,

          };

          case I_DONT_KNOW_IF_I_WANT_CHILDREN:
          return {
            ...state,
            iDontKnowIfIWantChildren: action.iDontKnowIfIWantChildren,
          };

          case ABOUT_ME:
          return {
            ...state,
            aboutMe: action.aboutMe,

          };
          case PARTNER_ITERATOR:
          return {
            ...state,
            partnerIterator: action.partnerIterator,

          };
          case PARTNER_PERSONALITY_TYPE_ONE:
          return {
            ...state,
            partnerPersonalityTypeOne: action.partnerPersonalityTypeOne,

          };
          
          case USER_PERSONALITY_TYPE:
          return {
            ...state,
            userPersonalityType: action.userPersonalityType,

          };
          case OWNER:
          return {
            ...state,
            owner: action.owner,

          };
          case AGE_OF_INTEREST:
          return {
            ...state,
            ageOfInterest: action.ageOfInterest,

          };
          case IMAGE1:
          return {
            ...state,
            image1: action.image1,

          };


          case IMAGE2:
          return {
            ...state,
            image2: action.image2,

          };
          case IMAGE3:
          return {
            ...state,
            image3: action.image3,

          };
          case IMAGE4:
          return {
            ...state,
            image4: action.image4,

          };
          case IMAGE5:
          return {
            ...state,
            image5: action.image5,

          };          
          case INTERESTED_IN_MALE:
          return {
            ...state,
            interestedInMale: action.interestedInMale,

          };
          case INTERESTED_IN_FEMALE:
          return {
            ...state,
            interestedInFemale: action.interestedInFemale,

          };          
          case HAS_USER_PAYED:
          return {
            ...state,
            hasUserPayed: action.hasUserPayed,

          };
          case LOCATION:
          return {
            ...state,
            location: action.location,

          };          
          case RADIUS:
          return {
            ...state,
            radius:action.radius

          };
          case IS_FEMALE:
          return {
            ...state,
            isFemale: action.isFemale,

          };          
          case NAME:
          return {
            ...state,
            name: action.name,

          };
          case AGE:
          return {
            ...state,
            age: action.age,

          };
          default:
          return state;
      }

    }

    export default personalDataReducer;    