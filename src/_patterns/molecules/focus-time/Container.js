// Externals - (A-z)
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internals - (A-z)
import FocusTime from './Component';
import { loadFocusTimeActionAsync } from './redux/asyncActionCreators';

const mapStateToProps = state => ({
  totalFocusTime: state.focusTime.totalFocusTime,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFocusTimeActionAsync,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FocusTime);
