import axios from 'axios';
import moment from 'moment'

export const calculateElevation = (prevCoords, curCoords) => {
  const prevLocation = [ prevCoords.latitude, prevCoords.longitude ].join(',');
  const curLocation = [ curCoords.latitude, curCoords.longitude ].join(',');
  return axios.get('https://maps.googleapis.com/maps/api/elevation/json',{
    params: {
      locations: `${prevLocation}|${curLocation}`,
      key: process.env.GOOGLE_MAP_API_KEY
    }
  }).then(({ data }) => {
    if (data.results[1] - data.results[0] > 0) {
      return res.data.results
    }
    return 0;
  });
};

export const calculateDistance = (prevCoords, curCoords) => {
  const prevLocation = [ prevCoords.latitude, prevCoords.longitude ].join(',');
  const curLocation = [ curCoords.latitude, curCoords.longitude ].join(',');
  return axios.get('https://maps.googleapis.com/maps/api/directions/json',{
    params: {
      origin: prevLocation,
      destination: curLocation,
      key: process.env.GOOGLE_MAP_API_KEY
    }
  }).then(({ data }) =>{
    if (data.status === 'ZERO_RESULTS') {
      return 0;
    }
    return data.routes[0].legs[0].distance.value;
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

  return currentMoment.diff(startMoment, 'minutes');
};

export const changeSpotTimeFormat = (startTime, spotTime) => {
  const startMoment = moment(startTime);
  const currentMoment = moment(spotTime);

  return moment.utc(currentMoment.diff(startMoment)).format('HH:mm:ss');
};

export const createFormData = image => {
  const data = new FormData();

  data.append('file', {
    uri: image.uri,
    name: image.uri.split('/').pop(),
    type: image.type
  });

  return data;
};
