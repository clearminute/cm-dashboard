// Externals - (A-z)
import { connect } from 'react-redux';

// Internals - (A-z)
import WeekdayChart from './Component';
import addDays from 'clearminute/common/utils/addDays';
import createDailyStats from './createDailyStats';
import { selectDateActionAsync } from 'clearminute/common/redux/asyncActionCreators';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mapStateToProps = state => ({
  stats: state.overview.weeklyStats // eslint-disable-line trailing-spaces
    ? createDailyStats(state.overview.weeklyStats.statsByHour) // eslint-disable-line trailing-spaces, max-len
    : undefined,
  statsDirty: state.overview.statsDirty,
  currentDay: days[(state.overview.date).getDay()],
  activeDate: state.overview.date,
});

const mapDispatchToProps = dispatch => ({
  handleChangeDate: (date, delta = 0) => {
    const newDate = addDays(date, delta);

    return dispatch(selectDateActionAsync(newDate));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeekdayChart);
