import getMonday from 'clearminute/common/utils/getMonday';
import getSunday from 'clearminute/common/utils/getSunday';

export default function createWeeklyFromUntil(date) {
  const immutableDate = new Date(date);
  const from = getMonday(immutableDate).setHours(0, 0, 0, 0);
  const until = getSunday(immutableDate).setHours(23, 59, 59, 59);

  return { from, until };
}
