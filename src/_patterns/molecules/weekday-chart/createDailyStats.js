// Externals (A-z)
import { get, each } from 'lodash';

// Internals (A-z)
import getDayName from 'clearminute/common/utils/getDayName';
import {
  PRODUCTIVE_KEY,
  NEUTRAL_KEY,
  DISTRACTING_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  UNASSIGNED_KEY,
} from 'clearminute/common/constants/constants';

export default function createDailyStats(stats) {
  let productive = 0.0;
  let neutral = 0.0;
  let slightlyProductive = 0.0;
  let slightlyDistracting = 0.0;
  let distracting = 0.0;
  let unassigned = 0.0;
  let totalTime = 0;
  let index = 0;
  let date = null;

  const result = [];

  // Fill default values (need a complete array)
  for (let i = 0; i < 7; i += 1) {
    result.push({
      day: getDayName((i + 1) % 7), // Sunday has index 0
      totalTime: 0,
      productive: 0,
      distracting: 0,
      slightlyDistracting: 0,
      slightlyProductive: 0,
      unassigned: 0,
      neutral: 0,
    });
  }

  each(stats, (yearStats, year) => {
    each(yearStats, (monthStats, month) => {
      each(monthStats, (dayStats, day) => {
        date = new Date(year, month, day);
        productive = 0.0;
        neutral = 0.0;
        distracting = 0.0;
        unassigned = 0.0;
        slightlyProductive = 0.0;
        slightlyDistracting = 0.0;
        each(dayStats, hourStats => {
          productive += get(hourStats, PRODUCTIVE_KEY, 0);
          neutral += get(hourStats, NEUTRAL_KEY, 0);
          distracting += get(hourStats, DISTRACTING_KEY, 0);
          slightlyDistracting += get(hourStats, SLIGHTLY_DISTRACTING_KEY, 0);
          slightlyProductive += get(hourStats, SLIGHTLY_PRODUCTIVE_KEY, 0);
          unassigned += get(hourStats, UNASSIGNED_KEY, 0);
        });

        totalTime =
          productive +
          neutral +
          distracting +
          slightlyDistracting +
          slightlyProductive +
          unassigned;
        // Handle the case that Sunday has index 0
        index = date.getDay() === 0 ? 6 : date.getDay() - 1;
        result[index] = {
          day: getDayName(date.getDay()),
          totalTime,
          productive,
          distracting,
          neutral,
          slightlyDistracting,
          slightlyProductive,
          unassigned,
        };
      });
    });
  });

  return result;
}
