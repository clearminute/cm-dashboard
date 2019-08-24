import defaults from 'lodash/defaults';
import _fetch from 'clearminute/common/remote/fetch';

export default function loadStats(getState, statsOptions = {}) {
  // TODO: Global disable of no-param-reassign didnt work, phh
  statsOptions = defaults({}, statsOptions, {
    // eslint-disable-line no-param-reassign
    from: new Date().setHours(0, 0, 0, 0),
    until: new Date().setHours(23, 59, 59, 59),
  });

  const params = {
    type: 'LOAD_STATS',
    message: statsOptions,
  };

  return _fetch(params);
}
