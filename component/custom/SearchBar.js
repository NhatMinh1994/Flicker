import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import Constant from "../../util/constant";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusSearch: false,
      keySearch: ""
    };
  }
  onpressClear() {
    this.setState({
      keySearch: ""
    });
  }
  textInputChange(text) {
    this.setState({ keySearch: text, statusSearch: true });
    var string = text;
    this.props.dispatch({
      type: "CHANGE_KEY_SEARCH",
      keySearch: text
    });
  }
  onpressSearch(){
      const{myKeySearch,myLink} = this.props
      this.props.dispatch({
          type:"CHANGE_LINK",
          linkSearch:Constant.linkSearch+ this.state.keySearch
        //   link: Constant.linkSearch+ this.state.keySearch
      })
        console.log("CHECK : " +myLink)
  }

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          ref="text"
          onSubmitEditing={this.props.onSubmitEditing}
          underlineColorAndroid="#757575"
          style={styles.textInputSearch}
          returnKeyType="search"
          onChangeText={text => this.textInputChange(text)}
          value={this.state.keySearch}
          
        />
        <TouchableOpacity
          style={this.state.statusSearch ? styles.btnClear : styles.hidden}
          onPress={() => this.onpressClear()}
        >
          <Image
            source={require("../../resource/imgclear.png")}
            style={styles.imgClear}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    myKeySearch: state.keySearch,
    myLink:state.link
  };
}
export default connect(mapStateToProps)(SearchBar);
const styles = {
  btnClear: {
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute"
  },

  imgClear: {
    width: 15,
    height: 15
  },
  hidden: {
    width: 0,
    height: 0
  },
  textInputSearch: {
    //   backgroundColor: 'red',
    width: "80%",
    height: 50
  }
};
