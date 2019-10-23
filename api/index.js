import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import authConstans from '../constants/auth';
import getEnvVars from '../environment';
const { API_URL, FB_API_KEY } = getEnvVars();

export const loginWithFacebook = async () => {
  const { type, token: fbToken } = await Facebook.logInWithReadPermissionsAsync(FB_API_KEY, {
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
      `${API_URL}/auth/login/facebook`,
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
    )
      .then(data => data.headers.usertoken);
  }
};

export const logoutAsync = async () => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        'content-type': 'application/json',
        userToken: 'Bearer ' + userToken
      }
    },
  ).then(async () => {
    await SecureStore.deleteItemAsync(authConstans.FBTOKEN);
    await SecureStore.deleteItemAsync(authConstans.USERTOKEN);
  });
};

export const getCoursesByLocation = async (pageNo, pageSize, currentLocation) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.get(
    `${API_URL}/feeds`,
    {
      params: {
        pageNo,
        pageSize,
        lon: currentLocation[0],
        lat: currentLocation[1]
      },
      headers: {
        userToken: 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(res => res.data);
};

export const getMyCourses = async () => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.get(
    `${API_URL}/mycourses`,
    {
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
    `${API_URL}/course/new`,
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
  ).then(res => res.data);
};

export const updateCurrentPath = async (courseId, path, distance, elevation) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  const locations = path.map(location => {
    return {
      type: 'Point',
      coordinates: location.coordinates,
      timestamp: location.timestamp
    };
  });
  return axios.put(`${API_URL}/course/${courseId}/path`,
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

export const updateImageByLocation = async (location, courseId, imageUrl) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.put(
    `${API_URL}/course/${courseId}/image`,
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
  )
    .then(res => res.data);
};

export const updateThumbnailImage = async (courseId, imageUrl) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.put(
    `${API_URL}/course/${courseId}/thumbnail`,
    {
      imageUrl
    },
    {
      headers: {
        'content-type': 'application/json',
        'userToken': 'Bearer ' + userToken,
        socialId
      }
    },
  )
    .then(res => res.data);
};


export const getImageUrl = async (courseId, imageData) => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
  return axios.post(
    `${API_URL}/course/${courseId}/image/upload`,
    imageData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'userToken': 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(({ data }) => data.imageUrl);
};

export const getCourseData = async courseId => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.get(
    `${API_URL}/course/${courseId}`,
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

  return axios.put(
    `${API_URL}/course/${courseId}/info`,
    {
      title,
      description,
      isPublic
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'userToken': 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(({ data }) => data);
};

export const deleteCourse = async courseId => {
  const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
  const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);

  return axios.delete(
    `${API_URL}/course/${courseId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'userToken': 'Bearer ' + userToken,
        socialId
      }
    },
  ).then(({ data }) => data);
};
