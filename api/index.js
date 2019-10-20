import * as Facebook from 'expo-facebook';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import authConstans from '../constants/auth';

export const loginWithFacebook = async () => {
  const { type, token: fbToken } = await Facebook.logInWithReadPermissionsAsync(process.env.FB_API_KEY, {
    permissions: ['public_profile'],
  });
  if (type === 'success') {
    const user = await axios.get(
      authConstans.FB_GRAPH_URL(fbToken)
    ).then(res => res.data);
    const userToken = await getUserToken(user);

    await SecureStore.setItemAsync(authConstans.SOCIAL_ID, user.id);
    await SecureStore.setItemAsync(authConstans.FBTOKEN, fbToken);
    await SecureStore.setItemAsync(authConstans.USERTOKEN, userToken);
    return user;
  }

  function getUserToken(user) {
    return axios.post(
      `${process.env.API_URL}/login/facebook`,
      {
        socialService: authConstans.SOCIAL_SERVICE[0],
        socialId: user.id,
        userName: user.name,
        profileImage: user.picture.data.url
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      },
    ).then(data => data.headers.usertoken)
    .catch(err => console.log(err.message))
  }
};

export const getCoursesByLocation = async (pageNo, pageSize) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
  const { coords } = await Location.getCurrentPositionAsync();

  return axios.get(
    `${process.env.API_URL}/course`,
    {
      params: {
        pageNo,
        pageSize,
        lon: coords.longitude,
        lat: coords.latitude
      },
      headers: {
        userToken: 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(res => res.data);
};

export const postInitCourse = async (startLocation) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
  return await axios.post(
    `${process.env.API_URL}/course/new`,
    {
      startLocation
    },
    {
      headers: {
        'content-type': 'application/json',
        userToken: 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(res => res.data).catch(err => console.log(err.message));
}

export const postCurrentPath = async (courseId, path, distance, elevation) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  const locations = path.map(location => {
    return {
      type: 'Point',
      coordinates: location.coordinates,
      timestamp: location.timestamp
    };
  });
  return axios.post(`${process.env.API_URL}/course/${courseId}/path`,
    {
      path: locations,
      distance,
      elevation
    },
    {
     headers: {
       'content-type': 'application/json',
        userToken: 'Bearer ' + userToken,
        socialId
     }
    }).then(res => res.data);
};

export const postImageByLocation = async (location, courseId, imageUrl) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.post(
    `${process.env.API_URL}/course/${courseId}/image`,
    {
      location,
      imageUrl
    },
    {
      headers: {
        'content-type': 'application/json',
        'userToken': 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(res => res.data)
  .catch(err => alert('failure save image'));
}

export const getImageUrl = async (courseId, imageData) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
  return (
    axios.post(
      `${process.env.API_URL}/course/${courseId}/image/upload`,
      imageData,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
          'userToken': 'Bearer ' + userToken,
          socialId
        }
      },
    ).then(({ data }) => data.imageUrl)
    .catch(err => console.log('upload error', err.message))
  );
}

export const getCourseData = async courseId => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.get(`${process.env.API_URL}/course/${courseId}`,
  {
    headers: {
      userToken: 'Bearer ' + userToken,
      socialId
    }
  }).then(res => res.data);
};

export const updateCourseInfo = async (courseId, title, description, isPublic) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.post(
      `${process.env.API_URL}/course/${courseId}/info`,
      {
        title,
        description,
        isPublic
      },
      {
        headers: {
          'Content-Type': `application/json`,
          'userToken': 'Bearer ' + userToken,
          socialId
        }
      },
    ).then(({ data }) => console.log(data))
    .catch(err => console.log('upload error', err.message));
};
