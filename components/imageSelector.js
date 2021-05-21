import React,{ useState } from "react";
import {View, Image, Text, StyleSheet, Button, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/colors";

const ImageSelector = props => {
    const [ pickedImage, setPickedImage] = useState()


  const snapImageHandler =  async () => {


     const image = await ImagePicker.launchCameraAsync({
       allowsEditing: true,
       aspect: [16, 9],
       quality: 0.5
     });
     
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imageSelect}>
       <View style={styles.imageOutlook}>
         {!pickedImage ? (
            <Text >No image picked yet.</Text>
         ) : (
          <Image style={styles.image} source={{uri: pickedImage}}/>
         )}
          </View>   
       <Button 
       title="Take Image" 
       color={Colors.primary} 
       onPress={snapImageHandler}
       />
    </View>
  )
}

const styles = StyleSheet.create({
  imageSelect:{
    alignItems: "center",
    marginBottom: 15
  },
  imageOutlook:{
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }

});

export default ImageSelector;