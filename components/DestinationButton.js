import React, { Component } from "react";
import { Platform,View,ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default class Search extends Component {
  state = {
    searchFocused: false,
    user:null,
    destinationLocation: null,
    mapRegion:null,
  };
  componentWillMount() {
    this.setState({
        //user: this.props.firebase.auth().currentUser,
        //destinationLocation: this.props.pickUpLocation,
        mapRegion: {
            //latitude:       this.props.pickUpLocation.latitude,
           // longitude:      this.props.pickUpLocation.longitude,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5,
        },
    });
}

  render() {
    const { searchFocused } = this.state;
    const { onLocationSelected } = this.props;

    return (
      <View style={{flex:1,backgroundColor:'#fec25a'}}>
      <GooglePlacesAutocomplete 
        placeholder="A donde vas?"
        placeholderTextColor="#fff"
        
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyCcLncJS0DelHzF5QzhEFMpl3IxiQ9fYlI',
          components: 'country:DO',
          language: "es",
         types: [
         '(regions)',
         "locality", 
         "political",
          "geocode",
          "grocery_or_supermarket",
            "food",
            "store",
            "point_of_interest",
            "establishment",
            
            ],
            
        }}
        textInputProps={{
          onFocus: () => {
            this.setState({ searchFocused: true });
          },
          onBlur: () => {
            this.setState({ searchFocused: false });
          },
          autoCapitalize: "none",
          autoCorrect: false
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
       
        styles={{
          container: {
            position: "absolute",
            top: Platform.select({ ios: 60, android: 40 }),
            width: "100%"
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: "transparent",
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: "#fdbe4f",
            fontSize: 18,
            backgroundColor:'#fec25a',
            color:'#fff'
          },
          listView: {
            borderWidth: 1,
            borderColor: "#DDD",
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            marginTop: 10
          },
          description: {
            fontSize: 16
          },
          row: {
            padding: 20,
            height: 58
          }
        }}
      />
       
      </View>
    );
  }
}