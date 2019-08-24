import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopBar from './Component';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
