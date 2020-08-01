import * as React from 'react';
import { View,StyleSheet,Button } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Pusher from 'pusher-js/react-native';
import {CurrentLocationButton} from './CurrentLocationButton.js';
import Geocoder from 'react-native-geocoding';
import { regionFrom, getLatLonDiffInMeters } from './helpers';
Geocoder.init("AIzaSyCcLncJS0DelHzF5QzhEFMpl3IxiQ9fYlI");
export default class MapTaxi extends React.Component{
  state = {
    passenger: null,
    region: null,
    accuracy: null,
    nearby_alert: false,
    has_passenger: false,
    has_ridden: false
  }

    constructor(props){
        super(props);
        this.available_drivers_channel = null; 
    this.ride_channel = null;    
    this.pusher = null;

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
        this.state={
          region: null,
          
        }
        this._getLocationAsync();
      }
      _getLocationAsync = async () =>{
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted')
        console.log('Permission to access location was denied.');
        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true});
        let region ={
          latitude:location.coords.latitude,
          longitude:location.coords.longitude,
          latitudeDelta:0.045,
          longitudeDelta:0.045,
        }
        this.setState({region:region})
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
      centerMap(){
        const {latitude,
          longitude,
          latitudeDelta,
          longitudeDelta} = this.state.region;
          this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          })
      }
      
      
  componentDidMount() {

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
       
        var region = regionFrom(
          position.coords.latitude, 
          position.coords.longitude, 
          position.coords.accuracy
        );
       
        this.setState({
          region: region,
          accuracy: position.coords.accuracy
        });

        if(this.state.has_passenger && this.state.passenger){
          
          var diff_in_meter_pickup = getLatLonDiffInMeters(
            position.coords.latitude, position.coords.longitude, 
            this.state.passenger.pickup.latitude, this.state.passenger.pickup.longitude);

          if(diff_in_meter_pickup <= 20){
            
            if(!this.state.has_ridden){
              
              this.ride_channel.trigger('client-driver-message', {
                type: 'near_pickup',
                title: 'Solo un aviso',
                msg: 'Su conductor está cerca, ¡dé a conocer su presencia!'
              });

              this.setState({
                has_ridden: true
              });

            }

          }else if(diff_in_meter_pickup <= 50){

            if(!this.state.nearby_alert){

              this.setState({
                nearby_alert: true
              });

              Alert.alert(
                "Ve más despacio",
                "Tu pasajero está a la vuelta de la esquina",
                [
                  {
                    text: 'Gotcha!'
                  },
                ],
                { cancelable: false }
              );

            }
          
          }

          var diff_in_meter_dropoff = getLatLonDiffInMeters(
            position.coords.latitude, position.coords.longitude, 
            this.state.passenger.dropoff.latitude, this.state.passenger.dropoff.longitude);

          if(diff_in_meter_dropoff <= 20){
            this.ride_channel.trigger('client-driver-message', {
              type: 'near_dropoff',
              title: "Prepárate",
              msg: "Estás muy cerca de tu destino. Por favor prepare su pago."
            });

            this.ride_channel.unbind('client-driver-response');
            this.pusher.unsubscribe('private-ride-' + this.state.passenger.username);

            this.setState({
              passenger: null,
              has_passenger: false,
              has_ridden: false
            });

          }

          this.ride_channel.trigger('client-driver-location', { 
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });

        }

      },
      (error) => this.setState({ error: error.message }),
      { 
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 
      },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
      render(){
    
        return (
          <View style={styles.container}>
          {
            this.state.region && 
            <MapView
              style={styles.map}
              region={this.state.region}
            >
                <MapView.Marker
                  coordinate={{
                  latitude: this.state.region.latitude, 
                  longitude: this.state.region.longitude}}
                  title={"You're here"}
                />
                
                {
                  this.state.passenger && !this.state.has_ridden && 
                  <MapView.Marker
                    coordinate={{
                    latitude: this.state.passenger.pickup.latitude, 
                    longitude: this.state.passenger.pickup.longitude}}
                    title={"Your passenger is here"}
                    pinColor={"#4CDB00"}
                  />
                }
            </MapView>
          }
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });