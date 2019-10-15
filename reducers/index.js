import { COMPLETE_LOADING, COMPLETE_LOGIN, LOGOUT, SELECT_IMAGE, INIT_RECORDING, START_RECORDING, END_RECORDING } from '../constants/actionType';

const initialState = {
  isLoadingComplete: false,
  socialId: '',
  selectedImage: null,
  recordingStatus: 'BEFORE_RECORDING'
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_LOADING:
      return Object.assign({...state}, {
        isLoadingComplete: true
      });

    case COMPLETE_LOGIN:
      return Object.assign({...state}, {
        socialId: action.id
      });

    case LOGOUT:
      return Object.assign({...state}, {
        socialId: null
      });

    case SELECT_IMAGE:
      return Object.assign({...state}, {
        selectedImage: action.imageUrl
      });

    case INIT_RECORDING:
      return Object.assign({...state}, {
        recordingStatus: 'BEFORE_RECORDING'
      });

    case START_RECORDING:
      return Object.assign({...state}, {
        recordingStatus: 'RECORDING'
      });

    case END_RECORDING:
      return Object.assign({...state}, {
        recordingStatus: 'AFTER_RECORDING'
      });

    default:
      return state
  }
};
