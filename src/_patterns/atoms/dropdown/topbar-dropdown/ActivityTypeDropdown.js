import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { map, forEach } from 'lodash';

import Dropdown from 'clearminute/_patterns/atoms/dropdown/Component';
import { setActiveActivityTypeId } from 'clearminute/common/redux/actionCreators';

// Get activity types from user activities, e.g. won't show all of them
const getActivityTypes = activities => {
  const types = new Set();
  forEach(activities, activity => types.add(activity.type));
  const typesWithId = map(Array.from(types), type => ({ id: type, title: type }));
  return [
    { id: 'all', title: 'all' },
    { id: 'unassigned', title: 'uncategorized' },
    ...typesWithId,
  ];
};

const mapStateToProps = state => ({
  items: getActivityTypes(state.activities.activities),
  activeItemId: state.activities.activeActivityTypeId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveItemId: setActiveActivityTypeId,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdown);
