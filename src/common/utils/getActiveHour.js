import { findLastIndex } from 'lodash';

export default function getActiveHour(hourStats) {
  let activeHour = findLastIndex(
    [...hourStats],
    data => data.neutral + data.productive + data.distracting > 0,
  );

  if (activeHour === -1) {
    activeHour = new Date().getHours();
  }

  return activeHour;
}
