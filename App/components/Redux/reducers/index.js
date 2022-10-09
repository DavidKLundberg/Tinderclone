import { combineReducers } from "redux";
import personalDataReducer from "./personalDataReducer"
import chatRoomReducer from "./chatRoomReducer"
import matchPersonalDataReducer from "./matchPersonalDataReducer"
import pushTokenReducer from "./matchPersonalDataReducer"
import chatMessageReducer from "./chatMessageReducer"
import likesUserReducer from "./likesUserReducer"


// REMOVE INITIAL STATE FROM HERE AND MAKE IT RESET TO THE PRESET STATE
//WITHOUT HAVING TO HAVE A DOUBLE OF THE INITIAL STATE.

const initialState = {
  personalDataReducer: {
    owner: -99,
    age: -99,
    id: -99,
    name: "",
    personalityFilter: 1,
    filterOutFreeUsers: false,
    aboutMe: "",
    defaultReportText: "asd",
    //    gender:0,
    isFemale: false,
    tolerableLocation: 0,
    interestedInMale: false,
    interestedInFemale: false,
    location: [],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    //if this value is set to 1 show premium features
    hasUserPayed: false,
    dateOfLastPayment: 0,
    ageOfInterest: [18, 45],
    radius: [50],
    userPersonalityType: "",
    partnerPersonalityTypeOne: "",
    personalityTypeMe: "asdas",
    pushToken: -99,
    //have kids = 1 want kids = 2 mightWantKids = 10 I_DONT_KNOW_IF_I_WANT_CHILDREN = 2
    haveChildren: false,
    wantChildren: false,
    mightWantChildren: false,
    iDontKnowIfIWantChildren: false,
    partnerIterator: 0,
    //have dogs =1 have cats =2 have horses =10 have none = 20 have somethingelse = 5
    haveDogs: false,
    haveCats: false,
    haveHorses: false,
    noPets: false,
    //some other pet
    haveSomethingElse: false,
    //Hindu = 1 buddhist = 2 jewish=5 christian = 10 athiest = 20 muslim = 50 something else = 100

    hindu: false,
    christian: false,
    muslim: false,
    buddhist: false,
    athiest: false,
    jew: false,
    someOtherReligion: false
  },
  matchPersonalDataReducer:{},
  chatRoomReducer: {},
  chatMessageReducer:{},
  likesUserReducer:{},
};



const appReducer = combineReducers({
  personalDataReducer,
  chatRoomReducer,
  matchPersonalDataReducer,
  pushTokenReducer,
  chatMessageReducer,
  likesUserReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = initialState
  }

  return appReducer(state, action)
}


export default rootReducer;



