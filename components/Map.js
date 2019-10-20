import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';

const Map = props => {
  const { totalCoursePath, startLocation, currentLocation, totalCourseImages } = props;

  const renderCurrentLocation = () => {
    return {
      latitude: currentLocation.coordinates[1],
      longitude: currentLocation.coordinates[0],
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    };
  };
  const renderStartLocation = () =>{
    return {
      latitude: startLocation.coordinates[1],
      longitude: startLocation.coordinates[0]
    };
  };

  const renderTotalCourse = () => {
    return totalCoursePath.map((path, i) => {
      return {
        latitude: path.coordinates[1],
        longitude: path.coordinates[0],
      };
    });
  };

  const renderImageMarker = () => {
    return totalCourseImages.map((image, i) => {
      return (
        <Marker
          coordinate={{
            latitude: image.location.coordinates[1],
            longitude: image.location.coordinates[0]
          }}
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
      style={ { width:"100%", height:"100%" } }
      initialRegion={{
        latitude: currentLocation.coordinates[1],
        longitude: currentLocation.coordinates[0],
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }}
      region={renderCurrentLocation()}
    >
      <Marker
        coordinate={renderStartLocation()}
        title={'Start!'}
        description={'your start Point'}
      />
      <Marker
        coordinate={renderCurrentLocation()}
        title={'Start!'}
        description={'your start Point'}
      />
      {renderImageMarker() || <></>}
      <Polyline
        coordinates={renderTotalCourse()}
        strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={5}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#454d5d'
  },
});
