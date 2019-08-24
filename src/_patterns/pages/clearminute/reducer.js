import { assign } from 'lodash';

const initialState = {
  completedWalktrough: true,
};

export default function reducer(state = initialState, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_USER_DATA': {
      const { completedWalktrough } = action.payload;

      return assign({}, state, {
        completedWalktrough,
      });
    }

    case 'COMPLETE_WALKTROUGH': {
      return assign({}, state, {
        completedWalktrough: true,
      });
    }

    default:
      return state;
  }
}
