import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import placesReducer from "./store/placesReducer" 
import PlacesNavigator from "./navigation/PlacesNavigator";
import { init } from "./helpers/db"

init()
.then(() => {
  console.log("Initialized database");
})
.catch(err => {
  console.log("Initializing db failed.");
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

return (
    <Provider store={store}>
       <PlacesNavigator/>
    </Provider>   
  
  )
}


