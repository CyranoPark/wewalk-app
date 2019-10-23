import axios from 'axios';
import moment from 'moment';
import getEnvVars from '../environment';
const { GOOGLE_MAP_API_KEY } = getEnvVars();

export const getAddress = currentLocation => {
  const currentCoords = [ currentLocation[1], currentLocation[0] ].join(',');
  return axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        latlng: currentCoords,
        key: GOOGLE_MAP_API_KEY
      }
    }
  ).then(({ data }) => (
    data.results[0].formatted_address
  )).catch(() => 'Cannot Found Address');
};

export const calculateElevation = (prev, current) => {
  const prevLocation = [ prev.coordinates[1], prev.coordinates[0] ].join(',');
  const curLocation = [ current.coordinates[1], current.coordinates[0] ].join(',');
  return axios.get(
    'https://maps.googleapis.com/maps/api/elevation/json',
    {
      params: {
        locations: `${prevLocation}|${curLocation}`,
        key: GOOGLE_MAP_API_KEY
      }
    }
  ).then(({ data }) => {
    if (data.results[1].elevation - data.results[0].elevation > 0) {
      return data.results[1].elevation - data.results[0].elevation;
    }
    return 0;
  });
};


export const calculateDistance = (prev, current) => {
  const prevLat = prev.coordinates[1];
  const prevLng = prev.coordinates[0];
  const currentLat = current.coordinates[1];
  const currentLng = current.coordinates[0];

  const degreesToRadians = degrees => {
    return degrees * Math.PI / 180;
  };
  const R = 6378137;
  const dLat = degreesToRadians(currentLat - prevLat);
  const dLong = degreesToRadians(currentLng - prevLng);
  const line =
    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(prevLat)) *
    Math.cos(degreesToRadians(prevLat)) *
    Math.sin(dLong / 2) *
    Math.sin(dLong / 2);

  const adjust = 2 * Math.atan2(Math.sqrt(line), Math.sqrt(1 - line));
  const distance = R * adjust;

  return distance * 0.001;
};

export const changeCoordinateData = location => ({
  latitude: location.coordinates[1],
  longitude: location.coordinates[0]
});

export const changeElevationFormat = elevation => Math.round(elevation * 100) / 100;

export const changeDistanceFormat = distance => Math.round(distance * 100) / 100;

export const changeRecordTimeFormat = (startTime, endTime) => {
  const startMoment = moment(startTime);
  const currentMoment = moment(endTime) || moment(new Date());

  return moment.utc(currentMoment.diff(startMoment)).format('HH:mm:ss');
};

export const changeDateFormat = date => (
  moment.utc(moment(date)).format('YYYY년 MM월 DD일')
);

export const createFormData = imageUri => {
  const data = new FormData();
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  data.append('file', {
    uri: imageUri,
    name: imageUri.split('/').pop(),
    type: `image/${fileType}`
  });

  return data;
};
