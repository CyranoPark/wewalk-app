import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';
import { changeCoordinateData } from '../utils';

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
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }}
      region={renderCurrentLocation()}
    >
      <Marker
        coordinate={changeCoordinateData(startLocation)}
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
});

export default Map;
