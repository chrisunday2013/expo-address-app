import * as FileSystem from "expo-file-system";
import React from "react";

export const SET_PLACES = "SET_PLACES";
export const ADD_PLACE = "ADD_PLACE";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title, 
        newPath, 
        "Dummy address", 
        15.6, 
        12.3)
        ;
      console.log(dbResult);
      dispatch({type: ADD_PLACE, placeData: {id: dbResult.insertId, title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }
   
   };
}; 

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};