// Externals (A-z)
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internals (A-z)
import Activities from './Component';
import { showMoreActivitiesAction, resetActivitiesFiltersAction } from 'clearminute/common/redux/actionCreators';
import {
  loadActivitiesActionsAsync,
  toggleAlwaysactiveActivityAsync,
  toggleDisableInFocusActivityAsync,
} from 'clearminute/common/redux/asyncActionCreators';
import { setActiveActivityTypeId } from 'clearminute/common/redux/actionCreators';


const mapStateToProps = state => ({
  activities: state.activities.activities.filter((activity) => {
    const inTimeFrame = new Date(activity.lastActivityDate) > state.activities.timeframe.fromTime;
    if (state.activities.activeActivityTypeId === 'unassigned') {
      return inTimeFrame && activity.productivityKey === 'unassigned';
    }

    const inActiveType = state.activities.activeActivityTypeId === 'all'
      ? true
      : activity.type === state.activities.activeActivityTypeId;
    return inTimeFrame && inActiveType;
  }),
  activeActivityTypeId: state.activities.activeActivityTypeId,
  numberOfActivitiesToShow: state.activities.numberOfActivitiesToShow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    loadActivitiesActionsAsync,
    showMoreActivitiesAction,
    resetActivitiesFiltersAction,
    toggleAlwaysactiveActivityAsync,
    toggleDisableInFocusActivityAsync,
    setActiveActivityTypeId,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
