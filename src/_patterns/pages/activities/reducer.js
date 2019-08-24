// Externals - Others
import assign from 'lodash/assign';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import getNextUncategorizedActivity from './utils/getNextUncategorizedActivity';
import getSumTimeOfActivities from './utils/getSumTimeOfActivities';

const initialState = {
  activities: [],
  activeActivityTypeId: 'all',
  numberOfActivitiesToShow: 20,
  timeframe: {
    title: 'All time',
    id: 1,
    premiumOnly: false,
    fromTime: null,
  },
  uncategorizedActivity: undefined,
  totalTimeOfTop10Activities: 0,
  completedActivitiesWalkthrough: true,
};

export default function reducer(state = initialState, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_USER_DATA': {
      const { completedActivitiesWalkthrough } = action.payload;

      return assign({}, state, {
        completedActivitiesWalkthrough,
      });
    }

    case 'LOAD_ACTIVITIES': {
      const { activities } = action.payload;

      const sortedActivities = sortBy(activities, ['totalTime']).reverse();
      const totalTimeOfTop10Activities = getSumTimeOfActivities(sortedActivities.slice(0, 10));
      const uncategorizedActivity = getNextUncategorizedActivity(
        sortedActivities,
        totalTimeOfTop10Activities,
      );

      return assign({}, state, {
        activities: sortedActivities,
        uncategorizedActivity,
        totalTimeOfTop10Activities,
      });
    }

    case 'SHOW_MORE_ACTIVITIES': {
      return assign({}, state, {
        numberOfActivitiesToShow: state.numberOfActivitiesToShow + 40,
      });
    }

    case 'SET_ACTIVITY_TIMEFRAME': {
      const { timeframe } = action.payload;

      return assign({}, state, {
        timeframe,
      });
    }

    case 'SET_ACTIVE_ACTIVITY_TYPE_ID': {
      const { activityTypeId } = action.payload;

      return assign({}, state, {
        activeActivityTypeId: activityTypeId,
      });
    }

    case 'RESET_ACTIVITIES_FILTERS': {
      return assign({}, state, {
        activeActivityTypeId: initialState.activeActivityTypeId,
        numberOfActivitiesToShow: initialState.numberOfActivitiesToShow,
        timeframe: initialState.timeframe,
      });
    }

    case 'EDIT_ACTIVITY': {
      const { activity } = action.payload;

      const { isAlwaysActive, isDisableInFocus } = activity;

      const activities = map(state.activities, _activity => {
        if (activity.activityId === _activity.activityId) {
          return assign({}, activity);
        }

        if (_activity.type === 'youtube') {
          return assign({}, _activity, {
            isAlwaysActive,
            isDisableInFocus,
          });
        }

        return assign({}, _activity);
      });

      const sortedActivities = sortBy(activities, ['totalTime']).reverse();
      const uncategorizedActivity = getNextUncategorizedActivity(
        sortedActivities,
        state.totalTimeOfTop10Activities,
      );

      return assign({}, state, {
        activities,
        uncategorizedActivity,
      });
    }

    case 'COMPLETE_ACTIVITIES_WALKTHROUGH': {
      return assign({}, state, {
        completedActivitiesWalkthrough: true,
      });
    }

    default:
      return state;
  }
}
