
export const OWNER = "OWNER";
export const AGE = "AGE";
export const NAME = "NAME";
export const AGE_OF_INTEREST = "AGE_OF_INTEREST";
export const IS_FEMALE = "IS_FEMALE";
export const RADIUS = "RADIUS";
export const HAS_USER_PAYED = "HAS_USER_PAYED";
export const CHOSEN_LANGUAGE ="CHOSEN_LANGUAGE"
export const LOCATION = "LOCATION";
/*export const IMAGE1 = "IMAGE1";
export const IMAGE2 = "IMAGE2";
export const IMAGE3 = "IMAGE3";
export const IMAGE4 = "IMAGE4";
export const IMAGE5 = "IMAGE5";*/
export const IMAGE_ARRAY = "IMAGE_ARRAY";
export const ADD_IMAGE_TO_ARRAY = "ADD_IMAGE_TO_ARRAY";

export const ID = "ID";

export const USER_EXTRAVERSION ="USER_EXTRAVERSION";
export const USER_NEUROTIC ="USER_NEUROTIC";
export const USER_AGREEABLE ="USER_AGREEABLE";
export const USER_OPENNESS ="USER_OPENNESS";
export const USER_CONSCIENTIOUS ="USER_CONSCIENTIOUS";

export const USER_EXTRAVERSION_QUESTION_ANSWERED ="USER_EXTRAVERSION_QUESTION_ANSWERED";
export const USER_NEUROTIC_QUESTION_ANSWERED ="USER_NEUROTIC_QUESTION_ANSWERED";
export const USER_AGREEABLE_QUESTION_ANSWERED ="USER_AGREEABLE_QUESTION_ANSWERED";
export const USER_OPENNESS_QUESTION_ANSWERED ="USER_OPENNESS_QUESTION_ANSWERED";
export const USER_CONSCIENTIOUS_QUESTION_ANSWERED ="USER_CONSCIENTIOUS_QUESTION_ANSWERED";

export const PARTNER_EXTRAVERSION ="PARTNER_EXTRAVERSION";
export const PARTNER_NEUROTIC ="PARTNER_NEUROTIC";
export const PARTNER_AGREEABLE ="PARTNER_AGREEABLE";
export const PARTNER_OPENNESS ="PARTNER_OPENNESS";
export const PARTNER_CONSCIENTIOUS ="PARTNER_CONSCIENTIOUS";

export const PARTNER_EXTRAVERSION_QUESTION_ANSWERED ="PARTNER_EXTRAVERSION_QUESTION_ANSWERED";
export const PARTNER_NEUROTIC_QUESTION_ANSWERED ="PARTNER_NEUROTIC_QUESTION_ANSWERED";
export const PARTNER_AGREEABLE_QUESTION_ANSWERED ="PARTNER_AGREEABLE_QUESTION_ANSWERED";
export const PARTNER_OPENNESS_QUESTION_ANSWERED ="PARTNER_OPENNESS_QUESTION_ANSWERED";
export const PARTNER_CONSCIENTIOUS_QUESTION_ANSWERED ="PARTNER_CONSCIENTIOUS_QUESTION_ANSWERED";


//export const USER_PERSONALITY_TYPE = "USER_PERSONALITY_TYPE";
//export const PARTNER_PERSONALITY_TYPE_ONE = "PARTNER_PERSONALITY_TYPE_ONE";

export const ABOUT_ME = "ABOUT_ME";
//used for partners age range, just a bad variable name. Sorry!
export const INTERESTED_IN_FEMALE = "INTERESTED_IN_FEMALE";
export const INTERESTED_IN_MALE = "INTERESTED_IN_MALE";
export const PARTNER_ITERATOR = "PARTNER_ITERATOR"
export const GENDER = "GENDER"

export const HAVE_CHILDREN = "HAVE_CHILDREN";
export const WANT_CHILDREN = "WANT_CHILDREN";
export const MIGHT_WANT_CHILDREN = "MIGHT_WANT_CHILDREN";
export const I_DONT_KNOW_IF_I_WANT_CHILDREN = "I_DONT_KNOW_IF_I_WANT_CHILDREN";
export const STORE_HAS_CHANGED = "STORE_HAS_CHANGED"
export const HINDU = "HINDU";
export const BUDDHIST = "BUDDHIST";
export const JEW = "JEW";
export const CHRISTIAN = "CHRISTIAN";
export const ATHIEST = "ATHIEST";
export const SOME_OTHER_RELIGION = "SOME_OTHER_RELIGION";
export const MUSLIM = "MUSLIM";
export const BIRTHDAY = "BIRTHDAY"
export const PUSH_TOKEN = "PUSH_TOKEN"
export const PERSONALITY_FILTER ="PERSONALITY_FILTER"
export const FILTER_OUT_FREE_USERS ="FILTER_OUT_FREE_USERS"
export const USER_LOGOUT ="USER_LOGOUT"
export const INTERESTED_IN_OTHER = "INTERESTED_IN_OTHER";
export const ADD_IMAGE_ID_TO_ARRAY= "ADD_IMAGE_ID_TO_ARRAY"
export const REMOVE_IMAGE_ID_FROM_ARRAY = "REMOVE_IMAGE_ID_FROM_ARRAY"
export const IMAGE_ID_ARRAY = "IMAGE_ID_ARRAY"

export const PERSONAL_VALUES = "PERSONAL_VALUES";
export const REMOVE_IMAGE_FROM_ARRAY = "REMOVE_IMAGE_FROM_ARRAY"






export function userExtraversion(userExtraversion){
  return{
    type:"USER_EXTRAVERSION",
    userExtraversion
  }
}export function userExtraversionQuestionAnswered(userExtraversionQuestionAnswered){
  return{
    type:"USER_EXTRAVERSION_QUESTION_ANSWERED",
    userExtraversionQuestionAnswered
  }
}export function userAgreeable(userAgreeable){
  return{
    type:"USER_AGREEABLE",
    userAgreeable
  }
}export function userNeurotic(userNeurotic){
  return{
    type:"USER_NEUROTIC",
    userNeurotic
  }
}export function userConscientious(userConscientious){
  return{
    type:"USER_CONSCIENTIOUS",
    userConscientious
  }
}

export function userOpenness(userOpenness){
  return{
    type:"USER_OPENNESS",
    userOpenness
  }


}export function userAgreeableQuestionAnswered(userAgreeableQuestionAnswered){
  return{
    type:"USER_AGREEABLE_QUESTION_ANSWERED",
    userAgreeableQuestionAnswered
  }
}export function userNeuroticQuestionAnswered(userNeuroticQuestionAnswered){
  return{
    type:"USER_NEUROTIC_QUESTION_ANSWERED",
    userNeuroticQuestionAnswered
  }
}export function userConscientiousQuestionAnswered(userConscientiousQuestionAnswered){
  return{
    type:"USER_CONSCIENTIOUS_QUESTION_ANSWERED",
    userConscientiousQuestionAnswered
  }
}export function userOpennessQuestionAnswered(userOpennessQuestionAnswered){
  return{
    type:"USER_OPENNESS_QUESTION_ANSWERED",
    userOpennessQuestionAnswered
  }
}




export function partnerExtraversion(partnerExtraversion){
  return{
    type:"PARTNER_EXTRAVERSION",
    partnerExtraversion
  }
}export function partnerExtraversionQuestionAnswered(partnerExtraversionQuestionAnswered){
  return{
    type:"PARTNER_EXTRAVERSION_QUESTION_ANSWERED",
    partnerExtraversionQuestionAnswered
  }
}export function partnerAgreeable(partnerAgreeable){
  return{
    type:"PARTNER_AGREEABLE",
    partnerAgreeable
  }
}export function partnerNeurotic(partnerNeurotic){
  return{
    type:"PARTNER_NEUROTIC",
    partnerNeurotic
  }
}export function partnerConscientious(partnerConscientious){
  return{
    type:"PARTNER_CONSCIENTIOUS",
    partnerConscientious
  }
}

export function partnerOpenness(partnerOpenness){
  return{
    type:"PARTNER_OPENNESS",
    partnerOpenness
  }


}export function partnerAgreeableQuestionAnswered(partnerAgreeableQuestionAnswered){
  return{
    type:"PARTNER_AGREEABLE_QUESTION_ANSWERED",
    partnerAgreeableQuestionAnswered
  }
}export function partnerNeuroticQuestionAnswered(partnerNeuroticQuestionAnswered){
  return{
    type:"PARTNER_NEUROTIC_QUESTION_ANSWERED",
    partnerNeuroticQuestionAnswered
  }
}export function partnerConscientiousQuestionAnswered(partnerConscientiousQuestionAnswered){
  return{
    type:"PARTNER_CONSCIENTIOUS_QUESTION_ANSWERED",
    partnerConscientiousQuestionAnswered
  }
}export function partnerOpennessQuestionAnswered(partnerOpennessQuestionAnswered){
  return{
    type:"PARTNER_OPENNESS_QUESTION_ANSWERED",
    partnerOpennessQuestionAnswered
  }
}






































export function removeImageIdFromArray(removeImageIdFromArray){
  return {
    type:"REMOVE_IMAGE_ID_FROM_ARRAY",
    removeImageIdFromArray
  }
}
export function chosenLanguage(chosenLanguage){
  return{
    type:"CHOSEN_LANGUAGE",
    chosenLanguage
  }
}
export function addImageIdToArray(addImageIdToArray){
  return{
    type:"ADD_IMAGE_ID_TO_ARRAY",
    addImageIdToArray
  }
}


export function removeImageFromArray(removeImageFromArray){
  return {
    type:"REMOVE_IMAGE_FROM_ARRAY",
    removeImageFromArray
  }
}

export function addImageToArray(addImageToArray){
  return{
    type:"ADD_IMAGE_TO_ARRAY",
    addImageToArray
  }
}


export function imageArray(imageArray){
  return{
    type:"IMAGE_ARRAY",
    imageArray
  }
}
export function imageIdArray(imageIdArray){
  return{
    type:"IMAGE_ID_ARRAY",
    imageIdArray
  }
}


export function personalValues(personalValues){
  return {
    type:"PERSONAL_VALUES",
    personalValues
  }
}

export function interestedInOther(interestedInOther){
  return{
    type:"INTERESTED_IN_OTHER",
    interestedInOther
  }
}
export function gender(gender){
  return{
    type:"GENDER",
    gender
  }
}
export function storeHasChanged(storeHasChanged){
  return{
    type:"STORE_HAS_CHANGED",
    storeHasChanged
  }
}
export function birthday(birthday){
  return{
    type:"BIRTHDAY",
    birthday
  }
}
export function userLogout(){
  return{
    type:"USER_LOGOUT",
  }
}
export function filterOutFreeUsers(filterOutFreeUsers){
  return{
    type:"FILTER_OUT_FREE_USERS",
    filterOutFreeUsers
  }
}

export function personalityFilter(personalityFilter){
  return {
    type:"PERSONALITY_FILTER",
    personalityFilter
  }
}

export function id(id){
  return{
    type:"ID",
    id
  }
}
export function name(name) {
  return {
    type: "NAME",
    name
  };
}

  export function ageOfInterest(ageOfInterest){
    return{
      type:"AGE_OF_INTEREST",
      ageOfInterest
    }
  }
  export function partnerIterator(partnerIterator){return{type:"PARTNER_ITERATOR",partnerIterator}}

  export function jew(jew) {
    return { type: "JEW", jew };
  }
  export function hindu(hindu) {
    return { type: "HINDU", hindu };
  }
  export function buddhist(buddhist) {
    return { type: "BUDDHIST", buddhist };
  }
  export function christian(christian) {
    return { type: "CHRISTIAN", christian };
  }
  export function athiest(athiest) {
    return { type: "ATHIEST", athiest };
  }
  export function someOtherReligion(someOtherReligion) {
    return { type: "SOME_OTHER_RELIGION", someOtherReligion };
  }
  export function muslim(muslim) {
    return { type: "MUSLIM", muslim };
  }
  
  export function wantChildren(wantChildren) {
    return { type: "WANT_CHILDREN", wantChildren };
  }
  export function iDontKnowIfIWantChildren(iDontKnowIfIWantChildren) {
    return { type: "I_DONT_KNOW_IF_I_WANT_CHILDREN", iDontKnowIfIWantChildren };
  }
  export function mightWantChildren(mightWantChildren) {
    return { type: "MIGHT_WANT_CHILDREN", mightWantChildren };
  }
  
  export function haveChildren(haveChildren) {
    return {
      type: "HAVE_CHILDREN",
      haveChildren
    };
  }
  
  export function aboutMe(aboutMe) {
    return {
      type: "ABOUT_ME",
      aboutMe
    };
  } 
  export function radius(radius) {
    return {
      type: "RADIUS",
      radius
    };
  }
  
  export function interestedInFemale(interestedInFemale) {
    return {
      type: "INTERESTED_IN_FEMALE",
      interestedInFemale
    };
  }
  export function interestedInMale(interestedInMale) {
    return { type: "INTERESTED_IN_MALE", interestedInMale };
  }
  
  export function image1(image1) {
    return {
      type: "IMAGE1",
      image1
    };
  }
  export function image2(image2) {
    return {
      type: "IMAGE2",
      image2
    };
  }

  export function image3(image3) {
    return {
      type: "IMAGE3",
      image3
    };
  }

  export function image4(image4) {
    return {
      type: "IMAGE4",
      image4
    };
  }

  export function image5(image5) {
    return {
      type: "IMAGE5",
      image5
    };
  }
  export function pushToken(pushToken){
    return {
      type:"PUSH_TOKEN",
      pushToken
    }
  }
  export function location(location){
    return{
      type:"LOCATION",
      location
    }
  }
  export function hasUserPayed(hasUserPayed){
    return{
      type:"HAS_USER_PAYED",
      hasUserPayed
    }
  }
  export function isFemale(isFemale){
    return{
      type:"IS_FEMALE",
      isFemale
    }
  }
  export function age(age){
    return{
      type:"AGE",
      age
    }
  }
  export function owner(owner){
    return{
      type:"OWNER",
      owner
    }
  }

  export function userPersonalityType(userPersonalityType){
    return{
      type:"USER_PERSONALITY_TYPE",
      userPersonalityType
    }
  }
  export function partnerPersonalityTypeOne(partnerPersonalityTypeOne){
    return{
      type:"PARTNER_PERSONALITY_TYPE_ONE",
      partnerPersonalityTypeOne
    }
  }