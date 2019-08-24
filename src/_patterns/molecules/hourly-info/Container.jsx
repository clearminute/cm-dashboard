// Externals - (A-z)
import { connect } from 'react-redux';

// Internals - (A-z)
import createHourlyStats from '../../../common/utils/createHourlyStats';
import HourlyInfo from './Component';


const getStatsForActiveHour = (stats, activeHour) => {
  let statsForActiveHour = null;
  if (stats) {
    // TODO: Avoid calling createHourlyStats, instead rewrite getActiveHour function...
    statsForActiveHour = createHourlyStats(stats.statsByHour)[activeHour];
  }
  return statsForActiveHour;
};

const mapStateToProps = state => ({
  stats: getStatsForActiveHour(
    state.overview.stats,
    state.dayInsights.activeHour,
  ),
  statsDirty: state.overview.statsDirty,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HourlyInfo);
