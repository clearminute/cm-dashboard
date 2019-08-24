import getSunday from './getSunday';
import addDays from './addDays';

export default function getNextWeekMonday(date) {
  const sunday = getSunday(new Date(date));
  return addDays(sunday, 1);
}
