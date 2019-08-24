// Externals - (A-z)
import { findLastIndex, slice } from 'lodash';
import { connect } from 'react-redux';

// Internals - (A-z)
import HourlyChart from './Component';
import { setActiveHourAction } from 'clearminute/common/redux/actionCreators';
import createHourlyStats from 'clearminute/common/utils/createHourlyStats';


const PAGE_SIZE = 8;

const getStatsForActiveHour = (stats, activeHour) => {
  if (!stats) return [];
  const pageStart = Math.floor(activeHour / PAGE_SIZE) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;

  // TODO: Avoid calling createHourlyStats, instead rewrite getActiveHour function...
  return slice(createHourlyStats(stats.statsByHour), pageStart, pageEnd);
};

const getActiveHourFromPage = (stats, page, activeHour) => {
  if (page < 0) {
    return activeHour;
  }

  const pageStart = page * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const hoursInPage = slice(stats, pageStart, pageEnd);

  const lastIndexOfActiveHour = findLastIndex([...hoursInPage], data => (
    data.neutral +
    data.productive +
    data.distracting +
    data.slightlyDistracting +
    data.unassigned +
    data.slightlyProductive > 0
  ));

  if (lastIndexOfActiveHour >= 0) {
    return (page * PAGE_SIZE) + lastIndexOfActiveHour;
  }

  return activeHour;
};

const getPreviousPageActiveHour = (state) => {
  const stats = state.overview.stats;
  const activeHour = state.dayInsights.activeHour;
  if (!stats) return activeHour;

  const page = Math.floor(activeHour / PAGE_SIZE) - 1;
  // TODO: Avoid calling createHourlyStats, instead rewrite getActiveHour function...
  return getActiveHourFromPage(createHourlyStats(stats.statsByHour), page, activeHour);
};

const getNextPageActiveHour = (state) => {
  const stats = state.overview.stats;
  const activeHour = state.dayInsights.activeHour;
  if (!stats) return activeHour;

  const page = Math.floor(activeHour / PAGE_SIZE) + 1;
  // TODO: Avoid calling createHourlyStats, instead rewrite getActiveHour function...
  return getActiveHourFromPage(createHourlyStats(stats.statsByHour), page, activeHour);
};

const mapStateToProps = state => ({
  stats: getStatsForActiveHour(
    state.overview.stats,
    state.dayInsights.activeHour,
  ),
  statsDirty: state.overview.statsDirty,
  activeHour: state.dayInsights.activeHour,
  previousPageActiveHour: getPreviousPageActiveHour(state),
  nextPageActiveHour: getNextPageActiveHour(state),
});

const mapDispatchToProps = dispatch => ({
  setActiveHour: (activeHour) => {
    dispatch(setActiveHourAction(activeHour));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HourlyChart);
