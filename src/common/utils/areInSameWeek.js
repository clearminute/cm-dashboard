// this function assumes that next day for current and previousDate has
// always 24h distance (for edge cases)
export default function areInSameWeek(currentDate, previousDate) {
  const dayMillis = 24 * 60 * 60 * 1000;

  let earlierDayIndex =
    currentDate.getDay() === 0 ? currentDate.getDay() + 6 : currentDate.getDay() - 1;
  if (previousDate.getTime() < currentDate.getTime()) {
    earlierDayIndex =
      previousDate.getDay() === 0 ? previousDate.getDay() + 6 : previousDate.getDay() - 1;
  }

  return (
    Math.abs(currentDate.getTime() - previousDate.getTime()) <= (6 - earlierDayIndex) * dayMillis
  );
}
