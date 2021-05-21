import React from "react";
import {Platform, StyleSheet} from "react-native"
import { createStackNavigator} from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import PlacesListScreen from "../screens/PlaceListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen"
import Colors from "../constants/colors";

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
   defaultNavigationOptions: {
      headerStyle : {
        backgroundColor: Platform.OS === "android" ? Colors.primary: ''
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
   }

})

export default createAppContainer(PlacesNavigator);