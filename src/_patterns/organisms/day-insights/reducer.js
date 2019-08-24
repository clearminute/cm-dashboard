import { assign } from 'lodash';
import getActiveHour from '../../../common/utils/getActiveHour';
import createHourlyStats from '../../../common/utils/createHourlyStats';

const initialState = {
  activeHour: 0,
};

export default function reducer(state = initialState, action, root) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_STATS': {
      const { stats } = action.payload;
      // TODO: Avoid calling createHourlyStats, instead rewrite getActiveHour function...
      const hourStats = createHourlyStats(stats.statsByHour);

      return assign({}, state, {
        activeHour: getActiveHour(hourStats),
      });
    }

    case 'SET_ACTIVE_HOUR': {
      const activeHour = action.payload.activeHour;

      return assign({}, state, {
        activeHour,
      });
    }

    default:
      return state;
  }
}
