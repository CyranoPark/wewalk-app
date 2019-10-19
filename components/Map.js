import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';

const Map = props => {
  const { totalCoursePath, startLocation, currentLocation, totalCourseImages } = props;
  // const polylineCoords = totalCoursePath.map(location => ({
  //   latitude: location.coordinates[0],
  //   longitude: location.coordinates[1],
  // }));

  const renderImageMarker = () => {
    return totalCourseImages.map((image, i) => {
      return (
        <Marker
          coordinate={{
            latitude: image.location.coordinates[0],
            longitude: image.location.coordinates[1]
          }}
          key={i}
        >
          <Image
            source={{uri: image.image_url}}
            style={styles.image}
          />
        </Marker>
      )
    });
  };

  return (
    <MapView
        provider={PROVIDER_GOOGLE}
        style={ { width:"100%", height:"100%" } }
        showsUserLocation = {true}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
      <Marker
        coordinate={startLocation}
        title={'Start!'}
        description={'your start Point'}
      />
      {renderImageMarker() || <></>}
      <Polyline
        coordinates={totalCoursePath}
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
