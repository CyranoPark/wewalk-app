import reducer from './index';
import {
  COMPLETE_LOADING,
  INIT_RECORDING,
  START_RECORDING,
  END_RECORDING,
  LOADING_RECORD_SCREEN,
  COMPLETE_LOADING_RECORD_SCREEN,
  INIT_STATE
} from '../constants/actionType';
import {
  BEFORE_RECORDING,
  RECORDING,
  AFTER_RECORDING
} from '../constants/status';

const initialState = {
  isLoadingComplete: false,
  isLoadingRecord: false,
  recordingStatus: 'BEFORE_RECORDING'
};


describe('reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AppLoading State', () => {
    const action = {
      type: COMPLETE_LOADING,
    };
    expect(reducer(initialState, action).isLoadingComplete).toEqual(true);
  });

  it('shoud handle recording status', () => {
    const action = {
      type: START_RECORDING
    };
    expect(reducer(initialState, action).recordingStatus).toEqual(RECORDING);

    action.type = END_RECORDING;
    expect(reducer(initialState, action).recordingStatus).toEqual(AFTER_RECORDING);

    action.type = INIT_RECORDING;
    expect(reducer(initialState, action).recordingStatus).toEqual(BEFORE_RECORDING);
  });

  it('state handle record and map loading', () => {
    const action = {
      type: LOADING_RECORD_SCREEN
    };

    expect(reducer(initialState, action).isLoadingRecord).toEqual(true);

    action.type = COMPLETE_LOADING_RECORD_SCREEN;

    expect(reducer(initialState, action).isLoadingRecord).toEqual(false);
  });

  it('state handle init state', () => {
    const action = {
      type: START_RECORDING
    };

    expect(reducer(initialState, action).recordingStatus).toEqual(RECORDING);

    action.type = INIT_STATE;

    expect(reducer(initialState, action).recordingStatus).toEqual(BEFORE_RECORDING);
  });
});
