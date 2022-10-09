export const OWNER_MATCH = "OWNER_MATCH";
export const AGE_MATCH = "AGE_MATCH";
export const NAME_MATCH = "NAME_MATCH";
export const GENDER_MATCH = "GENDER_MATCH";
export const LOCATION_MATCH = "LOCATION_MATCH";
export const IMAGE1_MATCH = "IMAGE1_MATCH";
export const IMAGE2_MATCH = "IMAGE2_MATCH";
export const IMAGE3_MATCH = "IMAGE3_MATCH";
export const IMAGE4_MATCH = "IMAGE4_MATCH";
export const IMAGE5_MATCH = "IMAGE5_MATCH";
export const CLEAR_MATCHES = "CLEAR_MATCHES";

export const MATCH_USER_PERSONALITY_TYPE_MATCH = "MATCH_USER_PERSONALITY_TYPE_MATCH";

export const ABOUT_ME_MATCH = "ABOUT_ME_MATCH";

export const HAVE_CHILDREN_MATCH = "HAVE_CHILDREN_MATCH";
export const WANT_CHILDREN_MATCH = "WANT_CHILDREN_MATCH";
export const MIGHT_WANT_CHILDREN_MATCH = "MIGHT_WANT_CHILDREN_MATCH";
export const I_DONT_KNOW_IF_I_WANT_CHILDREN_MATCH = "I_DONT_KNOW_IF_I_WANT_CHILDREN_MATCH";

export const HINDU_MATCH = "HINDU_MATCH";
export const BUDDHIST_MATCH = "BUDDHIST_MATCH";
export const JEW_MATCH= "JEW_MATCH";
export const CHRISTIAN_MATCH = "CHRISTIAN_MATCH";
export const ATHIEST_MATCH = "ATHIEST_MATCH";
export const SOME_OTHER_RELIGION_MATCH = "SOME_OTHER_RELIGION_MATCH";
export const MUSLIM_MATCH = "MUSLIM_MATCH";
export const MATCH_USER = "MATCH_USER";
export const PUSH_TOKEN_MATCH = "PUSH_TOKEN_MATCH";

export const MATCH_USER_ARRAY = "MATCH_USER_ARRAY";

export function matchUserArray(matchUserArray){
  return{
    type:"MATCH_USER_ARRAY",
    matchUserArray
  }
}

export function pushTokenMatch(pushTokenMatch){
  return {
    type:"PUSH_TOKEN_MATCH",
    pushTokenMatch,
  }
}

export function matchUser(matchUser){
   return {
      type: "MATCH_USER",
      matchUser
    };
}


  export function nameMatch(nameMatch) {
    return { type: "NAME_MATCH", nameMatch };
  }
  export function jewMatch(jewMatch) {
    return { type: "JEW_MATCH", jewMatch};
  }
  export function hinduMatch(hinduMatch) {
    return { type: "HINDU_MATCH", hinduMatch };
  }
  export function buddhistMatch(buddhistMatch) {
    return { type: "BUDDHIST_MATCH", buddhistMatch };
  }
  export function christianMatch(christianMatch) {
    return { type: "CHRISTIAN_MATCH", christianMatch };
  }
  export function athiestMatch(athiestMatch) {
    return { type: "ATHIEST_MATCH", athiestMatch };
  }
  export function someOtherReligionMatch(someOtherReligionMatch) {
    return { type: "SOME_OTHER_RELIGION_MATCH", someOtherReligionMatch };
  }
  export function muslimMatch(muslimMatch) {
    return { type: "MUSLIM_MATCH", muslimMatch };
  }
  
  
  export function wantChildrenMatch(wantChildrenMatch) {
    return { type: "WANT_CHILDREN_MATCH", wantChildrenMatch };
  }
  export function iDontKnowIfIWantChildrenMatch(iDontKnowIfIWantChildrenMatch) {
    return { type: "I_DONT_KNOW_IF_I_WANT_CHILDREN_MATCH", iDontKnowIfIWantChildrenMatch };
  }
  export function mightWantChildrenMatch(mightWantChildrenMatch) {
    return { type: "MIGHT_WANT_CHILDREN_MATCH", mightWantChildrenMatch };
  }
  
  export function haveChildrenMatch(haveChildrenMatch) {
    return {
      type: "HAVE_CHILDREN_MATCH",
      haveChildrenMatch
    };
  }
  
  export function aboutMeMatch(aboutMeMatch) {
    return {
      type: "ABOUT_ME_MATCH",
      aboutMeMatch
    };
  }

  export function image1Match(image1Match) {
    return {
      type: "IMAGE1_MATCH",
      image1Match
    };
  }
  export function image2Match(image2Match) {
    return {
      type: "IMAGE2_MATCH",
      image2Match
    };
  }

  export function image3Match(image3Match) {
    return {
      type: "IMAGE3_MATCH",
      image3Match
    };
  }

  export function image4Match(image4Match) {
    return {
      type: "IMAGE4_MATCH",
      image4Match
    };
  }

  export function image5Match(image5Match) {
    return {
      type: "IMAGE5_MATCH",
      image5Match
    };
  }
  export function locationMatch(locationMatch){
    return{
      type:"LOCATION_MATCH",
      locationMatch
    }
  }

  export function genderMatch(genderMatch){
    return{
      type:"GENDER_MATCH",
      genderMatch
    }
  }
  export function ageMatch(ageMatch){
    return{
      type:"AGE_MATCH",
      ageMatch
    }
  }
  export function ownerMatch(ownerMatch){
    return{
      type:"OWNER_MATCH",
      ownerMatch
    }
  }

  export function userPersonalityTypeMatch(userPersonalityTypeMatch){
    return{
      type:"MATCH_USER_PERSONALITY_TYPE",
      userPersonalityTypeMatch
    }
  }

  export function clearMatches(){
    return{type:"CLEAR_MATCHES"}
  }