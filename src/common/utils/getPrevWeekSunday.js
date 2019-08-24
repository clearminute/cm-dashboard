import getMonday from './getMonday';
import addDays from './addDays';

export default function getPrevWeekSunday(currentDate) {
  const monday = getMonday(new Date(currentDate));
  return addDays(monday, -1);
}
