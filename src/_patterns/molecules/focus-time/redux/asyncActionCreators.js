import loadFocusTime from '../remote/loadFocusTime';
import { loadFocusTimeAction } from './actionCreators';

export function loadFocusTimeActionAsync(options = {}) {
  return (dispatch, getState) =>
    loadFocusTime(getState, options).then(
      res => dispatch(loadFocusTimeAction({ res, options })),
      err => dispatch(loadFocusTimeAction({}, null, err)),
    );
}
