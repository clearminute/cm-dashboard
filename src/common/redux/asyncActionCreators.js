// Internals (A-z)
import convertStats from 'clearminute/common/utils/convertStats';
import areInSameWeek from 'clearminute/common/utils/areInSameWeek';
import createWeeklyFromUntil from 'clearminute/common/utils/createWeeklyFromUntil';
import loadStats from 'clearminute/common/remote/loadStats';
import loadActivities from 'clearminute/common/remote/loadActivities';
import editActivity from 'clearminute/common/remote/editActivity';
import {
  loadStatsAction,
  setDateAction,
  loadActivitiesAction,
  editActivityAction,
  loadWeeklyStatsAction,
} from './actionCreators';
import createDailyFromUntil from '../utils/createDailyFromUntil';
import {
  loadFocusTimeActionAsync,
} from 'clearminute/_patterns/molecules/focus-time/redux/asyncActionCreators';

export function loadStatsActionAsync(from, until) {
  return (dispatch, getState) => {
    loadStats(getState, {
      from,
      until,
    }).then(
      res => dispatch(loadStatsAction(convertStats(res))),
      err => dispatch(loadStatsAction({}, null, err)),
    );
  };
}

export function displayDayActionAsync(date, force = false) {
  return (dispatch, getState) => {
    if (!force) {
      const previousDate = getState().overview.date;

      const isStatsEmpty =
        Object.keys(getState().overview.stats).length === 0 &&
        getState().overview.stats.constructor === Object;

      if (date === previousDate && !isStatsEmpty) {
        return;
      }
    }

    const {
      from,
      until,
    } = createDailyFromUntil(date);
    loadStats(getState, {
      from,
      until,
    }).then(res => dispatch(loadStatsAction(convertStats(res))));
  };
}

export function displayWeekActionAsync(date, force = false) {
  return (dispatch, getState) => {
    if (!force) {
      const previousDate = getState().overview.date;

      const isStatsEmpty =
        Object.keys(getState().overview.weeklyStats).length === 0 &&
        getState().overview.weeklyStats.constructor === Object;

      if (areInSameWeek(date, previousDate) && !isStatsEmpty) {
        return;
      }
    }

    const {
      from,
      until,
    } = createWeeklyFromUntil(date);
    dispatch(loadWeeklyStatsAction({})); // clear previous stats to show loading stripes
    loadStats(getState, {
      from,
      until,
    }).then(
      _res => dispatch(loadWeeklyStatsAction(convertStats(_res))),
      err => dispatch(loadWeeklyStatsAction({}, null, err)),
    );
  };
}

export function selectDateActionAsync(date) {
  return (dispatch, getState) => {
    const {
      from,
      until,
    } = createDailyFromUntil(date);
    dispatch(displayDayActionAsync(date));
    dispatch(displayWeekActionAsync(date));
    dispatch(
      loadFocusTimeActionAsync({
        from,
        until,
      }),
    );
    dispatch(setDateAction(date));
  };
}

export function loadActivitiesActionsAsync() {
  return (dispatch, getState) => {
    loadActivities(getState).then(
      res => dispatch(loadActivitiesAction(res)),
      err => dispatch(loadActivitiesAction({}, null, err)),
    );
  };
}

export function editActivityProductivityAsync(activity) {
  const editDelta = {
    activityId: activity.activityId,
    productivityKey: activity.productivityKey,
  };
  return dispatch => {
    dispatch(editActivityAction(activity));
    return editActivity(editDelta).then(
      res => dispatch(editActivityAction(res)),
      err => dispatch(editActivityAction({}, null, err)),
    );
  };
}

export function toggleAlwaysactiveActivityAsync(activity) {
  const editDelta = {
    activityId: activity.activityId,
    isAlwaysActive: !activity.isAlwaysActive,
  };
  const optimisticResult = {
    ...activity,
    isAlwaysActive: !activity.isAlwaysActive,
  };
  return dispatch => {
    dispatch(editActivityAction(optimisticResult));
    editActivity(editDelta).then(res => {}, err => dispatch(editActivityAction({}, null, err)));
  };
}

export function toggleDisableInFocusActivityAsync(activity) {
  const editDelta = {
    activityId: activity.activityId,
    isDisableInFocus: !activity.isDisableInFocus,
  };
  const optimisticResult = {
    ...activity,
    isDisableInFocus: !activity.isDisableInFocus,
  };
  return dispatch => {
    dispatch(editActivityAction(optimisticResult));
    editActivity(editDelta).then(res => {}, err => dispatch(editActivityAction({}, null, err)));
  };
}
