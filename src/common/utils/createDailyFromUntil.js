export default function createDailyFromUntil(date) {
  let from = new Date().setHours(0, 0, 0, 0);
  let until = new Date().setHours(23, 59, 59, 999);
  if (date) {
    from = date.setHours(0, 0, 0, 0);
    until = date.setHours(23, 59, 59, 999);
  }
  return {
    from,
    until,
  };
}
