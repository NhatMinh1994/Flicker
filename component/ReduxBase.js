// import React, { Component } from "react";
// import { View, Text, Alert, TouchableHighlight } from "react-native";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import Constant from "../util/constant";

// const initialState = {
//   keySearch: "anh",
//   link: Constant.link
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "CHANGE_KEY_SEARCH":
//       console.log(action.keySearch);
//       return { ...state, keySearch: action.keySearch };
//     case "CHANGE_LINK":
      
//       return { ...state, link: action.linkSearch };

//     default:
//       return state;
//   }
// };
// const store = createStore(reducer);

// export default class ReduxBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidUpdate() {
//     console.log("componentDidUpdate");
//   }
//   onpressNext(){
//     this.props.navigation.navigate('Home_')
//   }
//   render() {
//     return (
//       <Provider store={store}>
//       <View style={{flex:1}}>

//       <TouchableHighlight onPress={()=>this.onpressNext()}>
//         <Text>Minh</Text>
//       </TouchableHighlight>

//       </View>
//       </Provider>
//     );
//   }
// }

import {
  createStackNavigator,
} from 'react-navigation';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React from 'react';
import Home from './Home';
import DetailImage from './Detail';
import Constant from '../util/constant';


const AppNavigator = createStackNavigator({
  Home_:{
    screen:Home
  },
  Detail_:{
    screen:DetailImage
  }
},{
  headerMode:'none'
});

const initialState = {
  keySearch: "anh",
  link: Constant.link,
  lat:"",
  lon:"",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_KEY_SEARCH":
      console.log(action.keySearch);
      return { ...state, keySearch: action.keySearch };
    case "CHANGE_LINK":
      
      return { ...state, link: action.linkSearch };
    case "CHANGE_LOCATION":
      return{...state,link:action.linkLocation }
    default:
      return state;
  }
};

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  re:reducer
  
});



// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
  
);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
  
);

export default class ReduxBase extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}