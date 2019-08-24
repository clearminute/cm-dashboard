import 'whatwg-fetch';

import postMessage from '../utils/postMessage';

export default function fetchCustom(params = {}) {
  document.dispatchEvent(new CustomEvent('fetch:start'));
  if (params.type) {
    return postMessage(params.type, params.message);
  }

  return Promise.reject('No type for request');
}
