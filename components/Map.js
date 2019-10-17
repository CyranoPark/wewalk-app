import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container } from 'native-base';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';

const Map = props => {
  const { totalCoursePath, startLocation, totalCourseImages } = props;

  const renderImageMarker = () => {
    return totalCourseImages.map((image, i) => {
      return (
        <Marker
          coordinate={image.location}
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
    <Container>
      <MapView
          provider={PROVIDER_GOOGLE}
          style={ { width:"100%", height:"100%" } }
          showsUserLocation = {true}
          initialRegion={{
            latitude: startLocation.latitude,
            longitude: startLocation.longitude,
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
    </Container>
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
