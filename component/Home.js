import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  ToolbarAndroid,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Keyboard,
  Alert
} from "react-native";
import { connect } from "react-redux";

import Constant from "../util/constant";
import ItemImage from "./itemFlatlist/ItemImage";
import SearchBar from "./custom/SearchBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ten: "Minh",
      widthImage: Dimensions.get("screen").width,
      isLoading: true,
      statusSearch: false,
      keySearch: "",
      link:
        "https://api.flickr.com/services/rest/?api_key=6a68dc4789aa817dfbd2a84fb0e5ca86&format" +
        "=json&nojsoncallback=1&extras=url_s&method=flickr.photos.getRecent"
    };
  }

  componentDidMount() {
    const { myLink, myKeySearch } = this.props;
    console.log("My link : " + myLink);
    const { myNav, myNe } = this.props;

    return fetch(myLink)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.photos.photo
        });
        console.log("Data Source : " + this.state.dataSource);
      });
  }
  onpressLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location, isLoading: true });
        var lat = JSON.stringify(position.coords.latitude);
        var lon = JSON.stringify(position.coords.longitude);
        console.log(
          "LINK : " +
            Constant.linkLocation +
            Constant.lat +
            lat +
            Constant.lon +
            lon
        );
        fetch(Constant.linkLocation + Constant.lat + lat + Constant.lon + lon)
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.photos.photo
            });
          });
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 60000, maximumAge: 10000 }
    );
  }
  getKeySearch() {
    const { myLink, myKeySearch } = this.props;
    console.log("GET :" + myKeySearch);
    return myKeySearch;
  }
  onpressSearch() {
    if (this.state.statusSearch === true) {
      this.setState({
        statusSearch: false
      });
    } else {
      this.setState({
        statusSearch: true
      });
    }
    // Alert.alert(this.getKeySearch());
  }
  onpressSearchBar() {
    // Alert.alert("Key Search")
    fetch(Constant.linkSearch + this.getKeySearch())
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.photos.photo
        });
      });
  }
  onpressItem(url_s) {
    this.props.navigation.navigate("Detail_", { uri: url_s });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator style={{ height: 50 }} />
        </View>
      );
    }

    return (
      <View>
        <View />
        <View />
        <StatusBar hidden={false} backgroundColor="transparent" />
        <ToolbarAndroid
          style={{ backgroundColor: "blue", width: "100%", height: 50 }}
        >
          <View style={styles.viewToolBar}>
            <Text
              style={!this.state.statusSearch ? styles.txtTitle : styles.hidden}
            >
              PhotoGallery
            </Text>
            {/* <TouchableOpacity
              style={this.state.statusSearch ? styles.btnBack : styles.hidden}
            >
              <Image source={"../resource/back.png"} style={styles.imgBack} />
            </TouchableOpacity> */}
            <SearchBar
              onSubmitEditing={() => this.onpressSearchBar()}
              style={this.state.statusSearch ? styles.searchBar : styles.hidden}
            />
            {/* <TextInput
              onChangeText={text => this.setState({ keySearch: text })}
              placeholder="Search...."
              style={this.state.statusSearch ? styles.txtInput : styles.hidden}
            /> */}
            <TouchableOpacity
              style={styles.btnSearch}
              onPress={() => {
                this.onpressSearch();
              }}
            >
              <Image
                source={require("../resource/search.png")}
                style={styles.imgSearch}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnMap}
              onPress={() => this.onpressLocation()}
            >
              <Image
                style={styles.imgMap}
                source={require("../resource/imgMap.png")}
              />
            </TouchableOpacity>
          </View>
        </ToolbarAndroid>

        <FlatList
          keyExtractor={item => item.id}
          numColumns={3}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onpressItem(item.url_s)}>
              <ItemImage source={item.url_s} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    myKeySearch: state.re.keySearch,
    myLink: state.re.link,
    myNav: state.nav
  };
}
export default connect(mapStateToProps)(Home);
const { width, height } = Dimensions.get("window");
const styles = {
  btnSearch: {
    width: 50,
    height: 50,
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  btnMap: {
    width: 50,
    height: 50,
    marginLeft: "10%",
    marginRight: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  btnBack: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  hidden: {
    width: 0,
    height: 0
  },
  imgBack: {
    width: 24,
    height: 24
  },
  imgSearch: {
    width: 24,
    height: 24
  },
  imgMap: {
    width: 20,
    height: 20
  },
  searchBar: {
    width: "60%",
    height: 50
  },
  txtInput: {
    position: "absolute",
    width: "50%",
    height: "100%"
  },
  txtTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  viewLoading: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center"
  },
  viewToolBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "blue"
  }
};
