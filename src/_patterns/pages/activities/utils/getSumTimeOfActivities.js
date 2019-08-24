import each from 'lodash/each';

// activities has to be sorted according time
export default function getSumTimeOfActivities(activities) {
  let sumTime = 0;

  each(activities, activity => {
    sumTime += activity.totalTime;
  });

  return sumTime;
}
