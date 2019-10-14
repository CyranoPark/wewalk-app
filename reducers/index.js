import { COMPLETE_LOADING, COMPLETE_LOGIN, LOGOUT, SELECT_IMAGE } from '../constants/actionType';

const initialState = {
  isLoadingComplete: false,
  isAuthorize: false,
  socialId: '',
  selectedImage: null
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_LOADING:
      return Object.assign({...state}, {
        isLoadingComplete: true
      });

    case COMPLETE_LOGIN:
      return Object.assign({...state}, {
        isAuthorize: true,
        socialId: action.id
      });

    case LOGOUT:
      return Object.assign({...state}, {
        isAuthorize: false,
        socialId: null
      });

    case SELECT_IMAGE:
      return Object.assign({...state}, {
        selectedImage: action.imageUrl
      });

    default:
      return state
  }
};
