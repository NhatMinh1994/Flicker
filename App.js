/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Home from "./component/Home";

import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailImage from "./component/Detail";
import ReduxBase from "./component/ReduxBase";



const AppNavigator = createStackNavigator({
  ReduxBase_:{
    screen:ReduxBase
  },
  Home_: {
    screen: Home
  },
  Detail_:{
    screen: DetailImage
  }
},{
  headerMode:'none'
});

export default createAppContainer(AppNavigator);
