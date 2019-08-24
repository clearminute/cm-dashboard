// Internals - Reducers
import activitiesReducer from 'clearminute/_patterns/pages/activities/reducer';
import clearminuteReducer from 'clearminute/_patterns/pages/clearminute/reducer';
import dayInsightsReducer from 'clearminute/_patterns/organisms/day-insights/reducer';
import overviewReducer from 'clearminute/_patterns/pages/overview/reducer';
import focusTimeReducer from 'clearminute/_patterns/molecules/focus-time/redux/reducer';

// currently we dont use combineReducers, because our the reducers have cross access to their peers, especially
// to the root one. Not OK, working towards getting rid of cross accesses in reducers
// Note that this reducer will return everytime a different object, so on each state change, it will trigger rerender
// if you subscribe to the whole big object, but this is not a use case anywhere ATM.
// combineReducers on the other hand would check the old object for changes and only return a new one if those are
// present. We do that however on reducer level, so subscribing to substates such as activities, etc is no problem
const reducer = (state = {}, action) => ({
  activities: activitiesReducer(state.activities, action, state),
  clearminute: clearminuteReducer(state.clearminute, action, state),
  overview: overviewReducer(state.overview, action, state),
  dayInsights: dayInsightsReducer(state.dayInsights, action, state),
  focusTime: focusTimeReducer(state.focusTime, action, state),
});

export default reducer;
