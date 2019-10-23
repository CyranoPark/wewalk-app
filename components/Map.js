import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';
import { Asset } from 'expo-asset';

import { changeCoordinateData } from '../utils';
const hereMarker = Asset.fromModule(require('../assets/images/heremarker.png')).uri;
const startMarker = Asset.fromModule(require('../assets/images/startmarker.png')).uri;

const Map = props => {
  const {
    totalCoursePath,
    startLocation,
    currentLocation,
    totalCourseImages
  } = props;
  const [ location, setLocation ] = useState({
    latitude: currentLocation.coordinates[1],
    longitude: currentLocation.coordinates[0],
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const setCurrentLocation = region => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    });
  };

  const renderCurrentLocation = () => {
    const { latitudeDelta, longitudeDelta } = location;
    return {
      latitude: currentLocation.coordinates[1],
      longitude: currentLocation.coordinates[0],
      latitudeDelta,
      longitudeDelta
    };
  };

  const renderTotalCourse = () => {
    return totalCoursePath.map(path => changeCoordinateData(path));
  };

  const renderImageMarker = () => {
    return totalCourseImages.map((image, i) => {
      return (
        <Marker
          coordinate={changeCoordinateData(image.location)}
          key={i}
        >
          <Image
            source={{uri: image.image_url}}
            style={styles.image}
          />
        </Marker>
      );
    });
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={ { width:'100%', height:'100%' } }
      initialRegion={{
        latitude: currentLocation.coordinates[1],
        longitude: currentLocation.coordinates[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={location}
      onRegionChangeComplete={setCurrentLocation}
    >
      <Marker
        coordinate={changeCoordinateData(startLocation)}
        title={'Start!'}
        description={'your start Point'}
      >
        <Image
          source={{uri: startMarker}}
          style={styles.markerImage}
        />
      </Marker>
      <Marker
        coordinate={renderCurrentLocation()}
        title={'Here!'}
        description={'you are Here'}
      >
        <Image
          source={{uri: hereMarker}}
          style={styles.markerImage}
        />
      </Marker>
      {renderImageMarker() || <></>}
      <Polyline
        coordinates={renderTotalCourse()}
        strokeColor='#7F0000' // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={5}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#454d5d'
  },
  markerImage: {
    width: 50,
    height: 50
  }
});

export default Map;
