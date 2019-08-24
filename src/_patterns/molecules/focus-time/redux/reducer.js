import { assign } from 'lodash';

const initialState = {
  totalFocusTime: 0,
};

export default function reducer(state = initialState, action, root) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_FOCUS_TIME': {
      const totalFocusTime = action.payload.res.value;

      return assign(state, {
        totalFocusTime: Math.floor(totalFocusTime / 60),
      });
    }

    default:
      return state;
  }
}
