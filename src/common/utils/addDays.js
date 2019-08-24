export default function addDays(date, numberOfDays) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return new Date(date.getTime() + numberOfDays * oneDay);
}
