// Externals - (A-z)
import { connect } from 'react-redux';

// Internals - (A-z)
import Overview from './Component';
import {
  displayDayActionAsync,
  displayWeekActionAsync,
} from 'clearminute/common/redux/asyncActionCreators';

const mapStateToProps = state => ({
  date: state.overview.date,
});

const mapDispatchToProps = dispatch => ({
  loadDailyStats: date => dispatch(displayDayActionAsync(date, true)),
  loadWeeklyStats: date => dispatch(displayWeekActionAsync(date, true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
