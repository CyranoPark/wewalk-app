export default {
  SOCIAL_SERVICE: ['FACEBOOK'],
  FBTOKEN: 'FBTOKEN',
  USERTOKEN: 'USERTOKEN',
  FB_GRAPH_URL: (token) => `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`
};
