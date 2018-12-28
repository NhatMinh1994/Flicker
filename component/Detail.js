import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';

export default class DetailImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const {navigation }= this.props
    const uri= navigation.getParam('uri', 'NO-ID');
    return (
      <View style={{flex:1}}>
        <Image style ={{flex:1}} source={{uri:uri}}></Image>
      </View>
    );
  }
}
