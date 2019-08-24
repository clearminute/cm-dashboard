// Externals (A-z)
import { connect } from 'react-redux';

// Internals (A-z)
import GaugeChart from './Component';
import createGaugeStats from 'clearminute/_patterns/molecules/gauge-chart/createGaugeStats';
import colors from 'clearminute/styles/colors';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';
import {
  PRODUCTIVE_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  NEUTRAL_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  DISTRACTING_KEY,
} from 'clearminute/common/constants/constants';

const defaultGaugeStats = {
  totalTime: 0,
  productive: {
    totalTime: 0,
    percentage: 0,
  },
  slightlyProductive: {
    totalTime: 0,
    percentage: 0,
  },
  neutral: {
    totalTime: 0,
    percentage: 0,
  },
  unassigned: {
    totalTime: 0,
    percentage: 0,
  },
  slightlyDistracting: {
    totalTime: 0,
    percentage: 0,
  },
  distracting: {
    totalTime: 0,
    percentage: 0,
  },
};

const getGaugeStats = (stats, statsDirty) => {
  let gaugeStats = defaultGaugeStats;
  if (stats && !statsDirty) {
    const statsByHour = stats.statsByHour;
    gaugeStats = createGaugeStats(statsByHour);
  }
  return gaugeStats;
};

const calculatePercentage = (gaugeStats) => {
  const { productive, neutral, distracting, slightlyDistracting, slightlyProductive, unassigned } = gaugeStats;

  const productiveTime = (
    (1 * productive.totalTime) +
    (0.75 * slightlyProductive.totalTime) +
    (0.5 * (neutral.totalTime + unassigned.totalTime)) +
    (0.25 * slightlyDistracting.totalTime)
  );

  const totalTime = (
    productive.totalTime +
    slightlyProductive.totalTime +
    neutral.totalTime +
    slightlyDistracting.totalTime +
    distracting.totalTime +
    unassigned.totalTime
  );

  const score = totalTime === 0 ? 0.5 : (productiveTime / totalTime);

  return `${parseInt((score) * 100, 10)}`;
};

const createGaugeData = gaugeStats => ({
  [PRODUCTIVE_KEY]: {
    name: 'PRODUCTIVE',
    value: gaugeStats.productive.percentage,
    seconds: gaugeStats.productive.totalTime,
    color: colors['dark-sky-blue'],
  },
  [SLIGHTLY_PRODUCTIVE_KEY]: {
    name: 'SLIGHTLY_PRODUCTIVE',
    value: gaugeStats.slightlyProductive.percentage,
    seconds: gaugeStats.slightlyProductive.totalTime,
    color: colors['dark-sky-blue'],
  },
  [NEUTRAL_KEY]: {
    name: 'NEUTRAL',
    value: gaugeStats.neutral.percentage + gaugeStats.unassigned.percentage,
    seconds: gaugeStats.neutral.totalTime + gaugeStats.unassigned.totalTime,
    color: colors['pale-grey'],
  },
  [SLIGHTLY_DISTRACTING_KEY]: {
    name: 'SLIGHTLY_DISTRACTING',
    value: gaugeStats.slightlyDistracting.percentage,
    seconds: gaugeStats.slightlyDistracting.totalTime,
    color: colors['faded-orange'],
  },
  [DISTRACTING_KEY]: {
    name: 'DISTRACTING',
    value: gaugeStats.distracting.percentage,
    seconds: gaugeStats.distracting.totalTime,
    color: colors['faded-orange'],
  },
});

const mapStateToProps = state => ({
  gaugePercentage: calculatePercentage(getGaugeStats(
    state.overview.stats,
    state.overview.statsDirty,
  )),
  gaugeData: createGaugeData(getGaugeStats(
    state.overview.stats,
    state.overview.statsDirty,
  )),
  totalTime: convertToDisplayTime(getGaugeStats(
    state.overview.stats,
    state.overview.statsDirty,
  ).totalTime),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeChart);
