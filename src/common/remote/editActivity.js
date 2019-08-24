// Internals - Others
import _fetch from 'clearminute/common/remote/fetch';

export default function editActivity(activity) {
  const params = {
    type: 'EDIT_ACTIVITY',
    message: {
      activity,
    },
  };

  return _fetch(params);
}
