import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { removeImageFromArray, removeImageIdFromArray } from "./Redux/actions/personalAction";
import { connect } from "react-redux";
import { imageUrl } from "./Urls";

 class LoadImages extends React.Component {
    removeImage(imageIdentifier){
      switch(imageIdentifier){
        case 1:
        this.deleteImageFromServer(this.props.personalDataReducer.imageIdArray[0], 0)

        break;
        case 2:
        this.deleteImageFromServer(this.props.personalDataReducer.imageIdArray[1], 1)
  

        break;
        case 3:
        this.deleteImageFromServer(this.props.personalDataReducer.imageIdArray[2],2)
  

        break;
        case 4:
        this.deleteImageFromServer(this.props.personalDataReducer.imageIdArray[3],3)


        break;
        case 5:
        this.deleteImageFromServer(this.props.personalDataReducer.imageIdArray[4],4)
  

        break;
        default:
        break;
      
      }
    }
     deleteImageFromServer(serverId, localId){
      fetch(imageUrl + serverId + "/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json; charset=UTF-8",
          "WWW-Authenticate": this.props.personalDataReducer.owner
        }
      }).catch(error =>console.log(error))
      this.deleteImageLocally(localId)
    }
    deleteImageLocally(imgId){
      this.props.dispatch(removeImageFromArray(imgId));
      this.props.dispatch(removeImageIdFromArray(imgId))

    }
    //THIS IS DUMB BUT THE SWIPER BUGS IF I TRY TO ITERATE IN ANYWAY
  render() {
    let imageHolder = this.props.imageArray
    if (imageHolder == undefined){
      imageHolder = []
    }

    if(this.props.addAbilityToRemove == false){
    return (
      <View style={styles.contentHolder}>
      {imageHolder.length == 0 &&
            (<Swiper style={{ height: 250 }}>
                <View style={styles.personalityTypeImage}>
                  <Text style={styles.addImagesText}>
                    This user hasn't uploaded any images, maybe encourage them to do so!
                  </Text>
                </View>
              </Swiper>)}
      {imageHolder.length == 1 &&
            (<Swiper style={{ height: 250 }}>
    
            <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[0]}}
             />
             
      </Swiper>)}
          {imageHolder.length == 2 &&
            (<Swiper style={{ height: 250 }}>
    
            <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[0]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[1]}}
             />
      </Swiper>)}
      {imageHolder.length == 3 &&
            (<Swiper style={{ height: 250 }}>
    
            <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[0]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[1]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[2]}}
             />
      </Swiper>)}
      {imageHolder.length == 4 &&
            (<Swiper style={{ height: 250 }}>
    
            <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[0]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[1]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[2]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[3]}}
             />
      </Swiper>)}
      {imageHolder.length == 5 &&
            (<Swiper style={{ height: 250 }}>
    
            <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[0]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[1]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[2]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[3]}}
             />
             <Image
               style={styles.personalityTypeImage}
               source={{ uri: imageHolder[4]}}
             />
      </Swiper>)}
      </View>
    );
    }else{
      return (
        <View style={styles.contentHolder}>
        {imageHolder.length == 0 &&
              (<Swiper style={{ height: 250 }}>
                  <View style={styles.personalityTypeImage}>
                    
                    <Text style={styles.addImagesText}>
                   
                      Add Images, it makes your profile more interesting!
                    </Text>
                  </View>
                </Swiper>)}
        {imageHolder.length == 1 &&
              (<Swiper style={{ height: 250 }}>
              <View>
              <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[0]}}
               />
<TouchableOpacity style={styles.removeImageTouchable} onPress={() => this.removeImage(1)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               
        </Swiper>)}
            {imageHolder.length == 2 &&
              (<Swiper style={{ height: 250 }}>
      <View>
              <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[0]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable } onPress={() =>  this.removeImage(1)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[1]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(2)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               
        </Swiper>)}
        {imageHolder.length == 3 &&
              (<Swiper style={{ height: 250 }}>
      <View>
              <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[0]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(1)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[1]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(2)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[2]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(3)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               
        </Swiper>)}
        {imageHolder.length == 4 &&
              (<Swiper style={{ height: 250 }}>
        <View>
              <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[0]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(1)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
                 <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[1]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(2)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[2]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(3)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[3]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable}  onPress={() =>  this.removeImage(4)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               
        </Swiper>)}
        {imageHolder.length == 5 &&
              (<Swiper style={{ height: 250 }}>
      <View>              <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[0]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(1)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
              <View>               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[1]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(2)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
                 
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[2]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(3)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[3]}}
               />
               <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(4)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
               <View>
               <Image
                 style={styles.personalityTypeImage}
                 source={{ uri: imageHolder[4]}}
               />
                     <TouchableOpacity style={styles.removeImageTouchable} onPress={() =>  this.removeImage(5)}><Text style={styles.removeImageText}>X</Text>
</TouchableOpacity>
               </View>
        </Swiper>)}
        </View>
      ); 
    }
  }
}
const mapStateToProps = state => ({
  personalDataReducer: state.personalDataReducer,

});
export default connect(mapStateToProps)(LoadImages);
const styles = StyleSheet.create({
  contentHolder: { marginTop: 0, padding: 0, paddingBottom: 5 },
  flexOne: {
    flex: 1
  },
  imageHolder:{    
    height: 279,
    width: "100%",
},
  personalityTypeImage: {
    height: 279,
    width: "100%",
  },
  addImagesText: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    paddingTop: 100
  },
  removeImageTouchable:{
    marginTop:-270,
    marginLeft:10,
    zIndex: 1
  },
  removeImageText: {
    color: "black",
    fontWeight: "200",
    fontSize: 20
  }
});
