// Externals - Others
import { assign, find, map, values } from 'lodash';

export default function createHourlyStats(rawStatsUserTimezone, activeDate) {
  // eslint-disable-line
  const currentDayStats = values(values(values(rawStatsUserTimezone)[0])[0])[0];
  const hours = [];
  for (let i = 0; i < 24; i += 1) {
    hours.push(i);
  }

  const hourlyStats = map(currentDayStats, (stats, hour) => ({
    ...stats,
    hour: parseInt(hour, 10),
  }));

  const result = map(hours, hour => {
    const stats = find(hourlyStats, ['hour', hour]);
    if (!stats) {
      return {
        hour,
        distracting: 0,
        productive: 0,
        neutral: 0,
        unassigned: 0,
        slightlyProductive: 0,
        slightlyDistracting: 0,
        score: 0,
        totalTime: 0,
        mostActiveActivities: [],
      };
    }

    const totalTime =
      stats.productive +
      stats.slightlyProductive +
      stats.neutral +
      stats.unassigned +
      stats.slightlyDistracting +
      stats.distracting;

    const productiveTime =
      1 * stats.productive +
      0.75 * stats.slightlyProductive +
      0.5 * (stats.neutral + stats.unassigned) +
      0.25 * stats.slightlyDistracting;
    const score = totalTime === 0 ? 0 : productiveTime / totalTime;

    return assign({}, stats, {
      score,
      totalTime,
    });
  });

  return result;
}
