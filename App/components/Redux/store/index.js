import { createStore } from "redux";
import rootReducer from "../reducers/index";
const initialState = {
  pushTokenReducer:{
    pushTokenId:-99
  },
  personalDataReducer: {



        userExtraversion:0,
        userNeurotic: 0,
        userAgreeable:0,
        userOpenness: 0,
        userConscientious:0,
        userExtraversionQuestionAnswered:0,
        userNeuroticQuestionAnswered:0,
        userAgreeableQuestionAnswered: 0,
        userOpennessQuestionAnswered:0,
        userConscientiousQuestionAnswered:0,
        partnerExtraversion:0,
        partnerNeurotic:0,
        partnerAgreeable: 0,
        partnerOpenness:0,
        partnerConscientious:0,
        partnerExtraversionQuestionAnswered:0,
        partnerNeuroticQuestionAnswered:0,
        partnerAgreeableQuestionAnswered: 0,
        partnerOpennessQuestionAnswered:0,
        partnerConscientiousQuestionAnswered:0,





    owner: -99,
    age: -99,
    id: -99,
    name: "",
    personalityFilter: 1,
    filterOutFreeUsers: false,
    aboutMe: "",
    defaultReportText: "asd",
    gender:0,
    //Storehaschanged flags if redux store
    //and server data differs to proc
    //server patch
    storeHasChanged:false,
    isFemale: false,
    tolerableLocation: 0,
    chosenLanguage:"English",
    interestedInMale: false,
    interestedInFemale: false,
    interestedInOther: false,
    location: {
      "type": "Point",
      "coordinates": [
        75.0001,      
        75.0001		  
      ]
    },
  imageArray:[],
  imageIdArray:[],
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    personalValues:"",
    //if this value is set to 1 show premium features
    hasUserPayed: true,
    dateOfLastPayment: 0,
    ageOfInterest: [18, 45],
    radius: [50],
    userPersonalityType: "",
    partnerPersonalityTypeOne: "",
    partnerPersonalityTypeTwo: "",
    partnerPersonalityTypeThree: "",
    partnerPersonalityTypeFour: "",
    partnerPersonalityTypeFive: "",
    personalityTypeMe: "asdas",
    pushToken: -99,
    //have kids = 1 want kids = 2 mightWantKids = 10 I_DONT_KNOW_IF_I_WANT_CHILDREN = 2
    haveChildren: false,
    wantChildren: false,
    mightWantChildren: false,
    iDontKnowIfIWantChildren: false,
    partnerIterator: 0,
    //have dogs =1 have cats =2 have horses =10 have none = 20 have somethingelse = 5
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
  likesUserReducer:{}
};

/* MATCH OBJECT

{
      name: "sss",
      image1:
null,
      image2:
null,
      image3:
null,
      image4: null,
      image5: null,
      aboutMe: "adda",
      userPersonalityType: "INFJ",
      actualDistance: -99,
      age: -99,
      location: {
        "type": "Point",
        "coordinates": [
          75.0001,      
          75.0001		  
        ]
      },

      haveChildren: true,
      wantChildren: true,
      mightWantChildren: true,
      iDontKnowIfIWantChildren: true,
      haveDogs: true,
      haveCats: true,
      haveHorses: true,
      noPets: true,
      //some other pet
      haveSomethingElse: true,
      hindu: true,
      christian: true,
      muslim: true,
      buddhist: true,
      athiest: true,
      jew: true,
      someOtherReligion: true,
      pushToken: -99,
      ownerMatch: 4
    },
    {
      name: "sss",
      image1:
null,
      image2:
null,
      image3:
null,
      image4:
null,
      image5:
null,
      aboutMe: "adda",
      userPersonalityType: "INFJ",
      actualDistance: -99,
      age: -99,
      location: {
        "type": "Point",
        "coordinates": [
          75.0001,      
          75.0001		  
        ]
      },

      haveChildren: true,
      wantChildren: true,
      mightWantChildren: true,
      iDontKnowIfIWantChildren: true,
      haveDogs: true,
      haveCats: true,
      haveHorses: true,
      noPets: true,
      //some other pet
      haveSomethingElse: true,
      hindu: true,
      christian: true,
      muslim: true,
      buddhist: true,
      athiest: true,
      jew: true,
      someOtherReligion: true,
      pushToken: -99,
      ownerMatch: 4
    }*/
  
export default store = createStore(rootReducer, initialState);
