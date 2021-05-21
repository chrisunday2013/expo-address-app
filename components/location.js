import React, {useState} from "react";
import { 
  View, 
  Button, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  Text
} from "react-native";
import Colors from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";



const LocationPicker = props => {
    const [pickedLocation, setPickedLocation ] = useState()
    const [isFetching, setIsFetching] = useState(false);


  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const locationHandler = async () =>{
    const isPermitted = await verifyPermissions();
    if (!isPermitted) {
      return;
    }
 
    try {
      setIsFetching(true);
     const location = await Location.getCurrentPositionAsync({timeout: 5000});

    setPickedLocation({
      lat: location.coords.latitute,
      lng: location.coords.longitude
    });
    
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later or pick a different location on the map",
      [{ text: "Okay" }]
     );
    }
    setIsFetching(false);
  };

  return(
    <View style={styles.containerScreen}>
      <View style={styles.screen}>
         {isFetching ? (
           <ActivityIndicator size="large" color={Colors.primary}/>
         ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
        
        <Button 
        title="Get User Location" 
        color = {Colors.primary} 
        onPress={locationHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  containerScreen: {
          marginBottom: 15
  },
  screen: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})


export default LocationPicker;
