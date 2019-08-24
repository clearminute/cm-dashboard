import _fetch from 'clearminute/common/remote/fetch';
import { defaults } from 'lodash';

export default function loadFocusTime(getState, dateOptions = {}) {
  dateOptions = defaults({}, dateOptions, {
    // eslint-disable-line no-param-reassign
    from: new Date().setHours(0, 0, 0, 0),
    until: new Date().setHours(23, 59, 59, 59),
  });

  const params = {
    type: 'LOAD_FOCUS_TIME',
    message: dateOptions,
  };

  return _fetch(params);
}
