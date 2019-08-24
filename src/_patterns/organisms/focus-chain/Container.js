// Externals - (A-z)
import { connect } from 'react-redux';

// Internals - (A-z)
import FocusChain from './Component';
import { selectDateActionAsync } from 'clearminute/common/redux/asyncActionCreators';

const mapStateToProps = state => ({
  timePerDay: state.overview.totalFocusTimePerDay,
  activeDate: state.overview.date,
});

const mapDispatchToProps = dispatch => ({
  handleChangeDate: date => {
    dispatch(selectDateActionAsync(date));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FocusChain);
