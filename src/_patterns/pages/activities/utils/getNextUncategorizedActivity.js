import find from 'lodash/find';

// activities has to be sorted according time
export default function getNextUncategorizedActivity(sortedActivities, totalTimeOfTop10Activities) {
  const uncategorizedActivity = find(sortedActivities, ['productivityKey', 'unassigned']);

  if (
    totalTimeOfTop10Activities > 8 * 3600 &&
    uncategorizedActivity &&
    uncategorizedActivity.totalTime < 30 * 60
  ) {
    // if user has more than 8 hours logged in total
    // if less than 10 minutes spend on activity, not worth categorizing
    return null;
  } else if (uncategorizedActivity && uncategorizedActivity.totalTime < 5 * 60) {
    // user very new and had less than 8 hours logged
    // if less than 5 minutes spend on activity, not worth categorizing
    return null;
  }

  return uncategorizedActivity;
}
