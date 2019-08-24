// Externals (A-z)
import { connect } from 'react-redux';

// Internals (A-z)
import ActivityProductivitySwitcher from './Component';
import { editActivityProductivityAsync } from 'clearminute/common/redux/asyncActionCreators';
import {
  DISTRACTING_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  NEUTRAL_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  PRODUCTIVE_KEY,
} from 'clearminute/common/constants/constants';

const getNextProductivityKey = key =>
  [PRODUCTIVE_KEY, SLIGHTLY_PRODUCTIVE_KEY, NEUTRAL_KEY, SLIGHTLY_DISTRACTING_KEY, DISTRACTING_KEY][
    Number(key) - 1
  ];

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  handleProductivityKeyChange: (activity, key) => {
    dispatch(
      editActivityProductivityAsync({
        ...activity,
        productivityKey: getNextProductivityKey(key),
      }),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityProductivitySwitcher);
