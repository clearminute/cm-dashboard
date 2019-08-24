// Externals - (A-z)
import { connect } from 'react-redux';

// Internals - (A-z)
import TopActivities from './Component';
import getTopActivities from './getTopActivities';


const mapStateToProps = state => ({
  topActivities: getTopActivities(
    state.overview.stats,
  ),
  statsDirty: state.overview.statsDirty,
});

export default connect(
  mapStateToProps,
  null,
)(TopActivities);
