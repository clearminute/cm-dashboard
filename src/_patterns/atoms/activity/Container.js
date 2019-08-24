// Externals (A-z)
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internals (A-z)
import Activity from './Component';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activity);
