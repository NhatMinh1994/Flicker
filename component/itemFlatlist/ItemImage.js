import React, { Component } from 'react';
import { View, Text,Dimensions , Image} from 'react-native';

export default class ItemImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return ( 
            <Image
              source={{uri:this.props.source}}
              style={styles.imgItem}
            />
    );
  }
}
const width = Dimensions.get('window').width
const styles ={
    imgItem: {
        width: width / 3,
        height: width / 3
      },
}
