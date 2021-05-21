import React, {useState} from "react";
import {Button, ScrollView, Text, View, TextInput, StyleSheet} from "react-native"
import Colors from "../constants/colors";
import { useDispatch } from "react-redux";
import * as placesAction from "../store/placesAction";
import ImagePicker from "../components/imageSelector";
import LocationPicker from "../components/location" ;


const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChanger = text => {

    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  }

  const placeSaveHandler = () => {
    dispatch(placesAction.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };
  return (
    <ScrollView>
        <View style={styles.contain}>
            <Text style={styles.text}>Title</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={titleChanger}
            value={titleValue}
            />
            <ImagePicker onImageTaken={imageTakenHandler} />
            <LocationPicker/>
            <Button 
              title="Save Place" 
              color={Colors.primary} 
              onPress={placeSaveHandler}/>
        </View>
    </ScrollView>    
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place"

}

const styles = StyleSheet.create({
  contain: {
    margin: 30
  },
  text:{
    fontSize: 18,
    marginBottom: 15
  },
  textinput:{
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom:15,
    paddingVertical: 4,
    paddingHorizontal: 2

  }
})

export default NewPlaceScreen;
