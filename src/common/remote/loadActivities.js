import _fetch from 'clearminute/common/remote/fetch';

export default function loadActivities(getState) {
  const params = {
    type: 'LOAD_ACTIVITIES',
    message: null,
  };

  return _fetch(params);
}
