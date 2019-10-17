import axios from 'axios';

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
  return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',{
    params: {
      origins: prevLocation,
      destinations: curLocation,
      key: process.env.GOOGLE_MAP_API_KEY
    }
  }).then(({ data }) => data.rows[0].elements[0].distance.value);
};
