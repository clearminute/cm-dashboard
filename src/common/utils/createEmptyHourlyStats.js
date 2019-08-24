import createHourlyStats from 'clearminute/common/utils/createHourlyStats';

export default function createEmptyHourlyStats() {
  return createHourlyStats({ a: { b: { c: {} } } });
}
