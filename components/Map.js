import React from 'react';
import { Container, Icon, Button, Text, Content, View } from 'native-base';
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';

const Map = props => {
  const { totalCourseData, startLocation } = props;

  return (
    <Container>
      <MapView
          provider={PROVIDER_GOOGLE}
          style={ { width:"100%", height:"100%" } }
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
        <Polyline
          coordinates={totalCourseData.path}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
        />
      </MapView>
    </Container>
  );
};

export default Map;
