export function loadFocusTimeAction(payload = {}, meta = null, error = null) {
  return {
    type: 'LOAD_FOCUS_TIME',
    payload,
    meta,
    error,
  };
}
