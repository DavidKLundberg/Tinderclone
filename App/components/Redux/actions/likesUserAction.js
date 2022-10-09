export const LIKES_USER_ARRAY = "LIKES_USER_ARRAY";
export const REMOVE_FROM_LIKES= "REMOVE_FROM_LIKES";
export function likesUserArray(likesUserArray){
  return{
    type:"LIKES_USER_ARRAY",
    likesUserArray
  }
}
export function removeFromLikes(removeFromLikes){
  return{
    type:"REMOVE_FROM_LIKES",
    removeFromLikes
  }
}