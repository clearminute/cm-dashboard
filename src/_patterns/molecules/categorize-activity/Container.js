// Externals - (A-z)
import { connect } from 'react-redux';
import {
  DISTRACTING_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  NEUTRAL_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  PRODUCTIVE_KEY,
} from 'clearminute/common/constants/constants';
import {
  editActivityProductivityAsync,
  displayDayActionAsync,
  displayWeekActionAsync,
} from 'clearminute/common/redux/asyncActionCreators';

// Internals - (A-z)
import CategorizeActivity from './Component';

const getNextProductivityKey = key =>
  [PRODUCTIVE_KEY, SLIGHTLY_PRODUCTIVE_KEY, NEUTRAL_KEY, SLIGHTLY_DISTRACTING_KEY, DISTRACTING_KEY][
    Number(key) - 1
  ];

const mapStateToProps = state => ({
  activity: state.activities.uncategorizedActivity,
  date: state.overview.date,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleProductivityKeyChange: (key, activity, date) => {
    dispatch(
      editActivityProductivityAsync({
        ...activity,
        productivityKey: getNextProductivityKey(key),
      }),
    ).then(_res => {
      dispatch(displayDayActionAsync(date, true));
      dispatch(displayWeekActionAsync(date, true));
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategorizeActivity);
