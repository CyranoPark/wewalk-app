import axios from 'axios';
import moment from 'moment';

export const calculateElevation = (prev, current) => {
  const prevLocation = [ prev.coordinates[1], prev.coordinates[0] ].join(',');
  const curLocation = [ current.coordinates[1], current.coordinates[0] ].join(',');
  return axios.get('https://maps.googleapis.com/maps/api/elevation/json',{
    params: {
      locations: `${prevLocation}|${curLocation}`,
      key: process.env.GOOGLE_MAP_API_KEY
    }
  }).then(({ data }) => {
    if (data.results[1].elevation - data.results[0].elevation > 0) {
      return data.results[1].elevation - data.results[0].elevation
    }
    return 0;
  });
};


export const calculateDistance = (prev, current) => {
  const prevLocation = [ prev.coordinates[1], prev.coordinates[0] ].join(',');
  const curLocation = [ current.coordinates[1], current.coordinates[0] ].join(',');
  return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',{
    params: {
      origins: prevLocation,
      destinations: curLocation,
      key: process.env.GOOGLE_MAP_API_KEY,
      mode: 'transit'
    }
  }).then(({ data }) =>{
    return data.rows[0].elements[0].distance.value;
  })
};

/*
Object {
  "destination_addresses": Array [
    "37.5059945,127.0591692",
  ],
  "origin_addresses": Array [
    "37.5059947,127.0591692",
  ],
  "rows": Array [
    Object {
      "elements": Array [
        Object {
          "status": "ZERO_RESULTS",
        },
      ],
    },
  ],
  "status": "OK",
}
*/

export const changeElevationFormat = elevation => {
  return Math.round(elevation);
};

export const changeDistanceFormat = distance => {
  return Math.round(distance / 100) * 100 / 1000;
};

export const changeRecordTimeFormat = (startTime, endTime) => {
  const startMoment = moment(startTime);
  const currentMoment = moment(endTime) || moment(new Date());

  return moment.utc(currentMoment.diff(startMoment)).format('HH:mm:ss');
};

export const changeSpotTimeFormat = (startTime, spotTime) => {
  const startMoment = moment(startTime);
  const currentMoment = moment(spotTime);

  return moment.utc(currentMoment.diff(startMoment)).format('HH:mm:ss');
};

export const createFormData = image => {
  const data = new FormData();
  const uriParts = image.uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  data.append('file', {
    uri: image.uri,
    name: image.uri.split('/').pop(),
    type: `image/${fileType}`
  });

  return data;
};
