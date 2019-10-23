import {
  COMPLETE_LOADING,
  INIT_RECORDING,
  START_RECORDING,
  END_RECORDING,
  LOADING_RECORD_SCREEN,
  COMPLETE_LOADING_RECORD_SCREEN,
  INIT_STATE
} from '../constants/actionType';

const initialState = {
  isLoadingComplete: false,
  isLoadingRecord: false,
  recordingStatus: 'BEFORE_RECORDING'
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
  case COMPLETE_LOADING:
    return Object.assign({...state}, {
      isLoadingComplete: true
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

  case LOADING_RECORD_SCREEN:
    return Object.assign({...state}, {
      isLoadingRecord: true
    });

  case COMPLETE_LOADING_RECORD_SCREEN:
    return Object.assign({...state}, {
      isLoadingRecord: false
    });

  case INIT_STATE:
    return initialState;

  default:
    return state;
  }
};
