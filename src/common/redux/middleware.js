import postMessage from 'clearminute/common/utils/postMessage';

export default _ => next => action => {
  if (action.error) {
    return next(action);
  }

  switch (action.type) {
    case 'LOAD_ACTIVITIES': {
      postMessage(action.type, action.payload);
      return next(action);
    }

    case 'EDIT_ACTIVITY': {
      postMessage(action.type, action.payload);
      return next(action);
    }

    default:
      return next(action);
  }
};
