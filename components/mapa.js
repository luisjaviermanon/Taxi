import React, { Component, Fragment } from "react";
import { View, Image,Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";

import { getPixelSize } from "./util";
import firebase from '../database/firebase2';
import Search from './DestinationButton';
import Direction from "./Direction";


import markerImage from "../assets/marker.png";
import backImage from "../assets/back.png";
import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "../style";

import uberx from "../assets/uberx.png";

Geocoder.init("AIzaSyCcLncJS0DelHzF5QzhEFMpl3IxiQ9fYlI");
function Details() {
  return(
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viajes diarios baratos</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Jainero express</TypeTitle>
        <TypeDescription></TypeDescription>

        <RequestButton>
        
          <RequestButtonText  onPress={()=>alert('su viaje ha sido solicitado')}>SOLICITAR Jainero express</RequestButtonText>
        </RequestButton>
      </Container>
    );
}
export default class Mapa extends Component {
  
 
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null
  
}
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[1].formatted_address;
        const location = address.substring(0, address.indexOf(","));
       
        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
      
    });
  };

  handleBack = () => {
    this.setState({ destination: null });
  };

  render() {
    const { region, destination, duration, location } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              <Direction
                origin={region}
                destination={destination}
                onReady={result => {
                  
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details/>
          </Fragment>
          
        ) : (
          <Search onLocationSelected={this.handleLocationSelected}/>
        )}
     
     
      </View>
    );
  }
}