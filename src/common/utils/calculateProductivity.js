export default function calculateProductivity(gaugeStats, { defaultValue = 0 } = {}) {
  const totalTime = gaugeStats.totalTime;
  const productiveTime = gaugeStats.productive.totalTime;
  const neutralTime = gaugeStats.neutral.totalTime;

  if (totalTime === 0) {
    return defaultValue;
  }

  const productivity = (productiveTime + neutralTime / 2) / totalTime;

  return productivity;
}
