import {
  assign,
} from 'lodash';

const initialState = {
  stats: {},
  totalFocusTimePerDay: new Map(),
  weeklyStats: {},
  statsDirty: true,
  date: new Date(),
  completedOverviewWalkthrough: true,
};

export default function reducer(state = initialState, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_USER_DATA': {
      const {
        completedOverviewWalkthrough,
      } = action.payload;

      return assign({}, state, {
        completedOverviewWalkthrough,
      });
    }

    case 'SET_DATE': {
      const {
        date,
      } = action.payload;

      return assign({}, state, {
        date,
        statsDirty: true,
      });
    }

    case 'LOAD_STATS': {
      const {
        stats,
      } = action.payload;
      return assign({}, state, {
        stats,
        statsDirty: false,
      });
    }

    case 'LOAD_WEEKLY_STATS': {
      const {
        stats,
      } = action.payload;
      return assign({}, state, {
        weeklyStats: stats,
      });
    }

    case 'COMPLETE_OVERVIEW_WALKTHROUGH': {
      return assign({}, state, {
        completedOverviewWalkthrough: true,
      });
    }

    default:
      return state;
  }
}
