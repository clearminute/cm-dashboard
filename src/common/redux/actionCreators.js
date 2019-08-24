export function loadUserDataAction(payload = {}, meta = null, error = null) {
  return {
    type: 'LOAD_USER_DATA',
    payload,
    meta,
    error,
  };
}

export function loadStatsAction(stats, meta = null, error = null) {
  return {
    type: 'LOAD_STATS',
    payload: {
      stats,
    },
    meta,
    error,
  };
}

export function displayGithubTimePerDayAction(result, meta = null, error = null) {
  return {
    type: 'DISPLAY_GITHUB',
    payload: {
      result,
    },
    meta,
    error,
  };
}

export function loadWeeklyStatsAction(stats, meta = null, error = null) {
  return {
    type: 'LOAD_WEEKLY_STATS',
    payload: {
      stats,
    },
    meta,
    error,
  };
}

export function setDateAction(date, meta = null, error = null) {
  return {
    type: 'SET_DATE',
    payload: {
      date,
    },
    meta,
    error,
  };
}

export function loadActivitiesAction(activities, meta = null, error = null) {
  return {
    type: 'LOAD_ACTIVITIES',
    payload: {
      activities,
    },
    meta,
    error,
  };
}

export function showMoreActivitiesAction(meta = null, error = null) {
  return {
    type: 'SHOW_MORE_ACTIVITIES',
    payload: {},
    meta,
    error,
  };
}

export function resetActivitiesFiltersAction(meta = null, error = null) {
  return {
    type: 'RESET_ACTIVITIES_FILTERS',
    payload: {},
    meta,
    error,
  };
}

export function editActivityAction(activity, meta = null, error = null) {
  return {
    type: 'EDIT_ACTIVITY',
    payload: {
      activity,
    },
    meta,
    error,
  };
}

export function setActiveHourAction(activeHour, meta = null, error = null) {
  return {
    type: 'SET_ACTIVE_HOUR',
    payload: {
      activeHour,
    },
    meta,
    error,
  };
}

export function setActiveActivityTypeId(activityTypeId, meta = null, error = null) {
  return {
    type: 'SET_ACTIVE_ACTIVITY_TYPE_ID',
    payload: {
      activityTypeId,
    },
    meta,
    error,
  };
}

export function setActivityTimeframe(timeframe, meta = null, error = null) {
  return {
    type: 'SET_ACTIVITY_TIMEFRAME',
    payload: {
      timeframe,
    },
    meta,
    error,
  };
}

export function completeWalktroughAction(meta = null, error = null) {
  return {
    type: 'COMPLETE_WALKTROUGH',
    payload: {},
    meta,
    error,
  };
}

export function completeOverviewWalkthroughAction(meta = null, error = null) {
  return {
    type: 'COMPLETE_OVERVIEW_WALKTHROUGH',
    payload: {},
    meta,
    error,
  };
}

export function completeActivitiesWalkthroughAction(meta = null, error = null) {
  return {
    type: 'COMPLETE_ACTIVITIES_WALKTHROUGH',
    payload: {},
    meta,
    error,
  };
}
