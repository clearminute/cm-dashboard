// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import InlineSVG from 'react-inlinesvg';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/es/constants';
import { map, take, find } from 'lodash';

// Internals (A-z)
import ActivityContainer from 'clearminute/_patterns/atoms/activity/Container';
import ActivityTypeDropdown from 'clearminute/_patterns/atoms/dropdown/topbar-dropdown/ActivityTypeDropdown';
import Button from 'clearminute/_patterns/atoms/button/Component';
import Modal from 'clearminute/_patterns/atoms/modal/Component';
import AlertBar from 'clearminute/_patterns/atoms/alert-bar/Component';
import TopBarContainer from 'clearminute/_patterns/molecules/top-bar/Container';
import Switch from 'clearminute/_patterns/atoms/switch/Component';
import helpIcon from 'clearminute/styles/svg/help-icon.svg';
import getUrlParams from 'clearminute/common/utils/getUrlParams';


class Activities extends React.Component {
  constructor(props) {
    super(props);

    let showFocusConfigurationHelp = false;
    if (getUrlParams(window.location.href).configureFocus !== undefined) {
      showFocusConfigurationHelp = true;
    }

    this.state = {
      editActivityId: null,
      editModalOpen: false,
      showFocusConfigurationHelp,
      dropShadow: false,
      run: false,
      steps: [
        {
          target: '.weird-joyride-anchor',
          content: 'Here is a list of all your activities, they are sorted by the amount of time you spent.',
          placement: 'center',
        },
        {
          target: '.activity-type-icon',
          content: `The activity icon indicates activity type and its productivity level.
            Blue activities are productive and red are distracting.
            Each activity can be one of the following types: website, app, youtube or reddit.`,
          placement: 'bottom',
        },
        {
          target: '.activity-productivity-switcher',
          content: 'Use the control buttons to customize the productivity level of your activities.',
          placement: 'bottom',
        },
        {
          target: '.activity__content__settings',
          content: 'Other activity properties can be customized through the edit dialog.',
          placement: 'bottom',
        },
      ],
    };


    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.setEditActivityId = this.setEditActivityId.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { completedActivitiesWalkthrough } = this.props;
    if (!completedActivitiesWalkthrough) {
      this.setState({ run: true });
    }
    // Note: This is meant for new users that just install the app and don't have any activities and switch screens
    // for heavy users that's not use case because newer activities will appear on bottom and wont be visible
    // TODO: Optimize
    this.props.loadActivitiesActionsAsync();
    const scrollContainer = document.getElementsByClassName('u-scroll-container')[0];
    scrollContainer.addEventListener('scroll', this.handleScroll);

    if (getUrlParams(window.location.href).filterUncategorized !== undefined) {
      this.props.setActiveActivityTypeId('unassigned');
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.completedActivitiesWalkthrough === true &&
      this.props.completedActivitiesWalkthrough === false &&
      this.state.run !== true
    ) {
      this.setState({ run: true });
    }
  }

  componentWillUnmount() {
    this.props.resetActivitiesFiltersAction();
  }

  setEditActivityId(activityId) {
    this.setState({ editActivityId: activityId });
    this.toggleEditModal();
  }

  toggleEditModal() {
    this.setState(prevState => ({ editModalOpen: !prevState.editModalOpen }));
  }

  handleScroll() {
    const el = document.getElementsByClassName('u-scroll-container')[0];
    if (el.scrollTop >= 25 && !this.state.dropShadow) {
      this.setState({ dropShadow: true });
    } else if (el.scrollTop < 25 && this.state.dropShadow) {
      this.setState({ dropShadow: false });
    }
  }

  walkthroughCallback(tour) {
    if (tour.type === EVENTS.TOUR_END) {
      this.props.completeActivitiesWalkthroughActionAsync();
    }
  }

  render() {
    const {
      activities,
      numberOfActivitiesToShow,
      showMoreActivitiesAction,
      toggleAlwaysactiveActivityAsync,
      toggleDisableInFocusActivityAsync,
      completedActivitiesWalkthrough,
    } = this.props;

    const {
      editModalOpen,
      editActivityId,
      showFocusConfigurationHelp,
    } = this.state;

    const editActivity = find(activities, activity => activity.activityId === editActivityId);
    const shownActivities = take(activities, numberOfActivitiesToShow);

    let modalTitle = 'EDIT ACTIVITY';

    if (editActivity && editActivity.type === 'youtube') {
      modalTitle = 'YOUTUBE ACTIVITIES ARE NOT EDITABLE';
    }

    return (
      <div>
        <Joyride
          steps={this.state.steps}
          run={this.state.run}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          scrollToFirstStep={true}
          disableOverlay={true}
          locale={{
            skip: 'Skip Walkthrough',
          }}
          styles={{
            options: {
              arrowColor: '#3C7AD3',
              backgroundColor: '#3C7AD3',
              beaconSize: 50,
              primaryColor: '#3C7AD3',
              textColor: '#ffffff',
              // width: 900,
            },
          }}
          callback={this.walkthroughCallback.bind(this)}
        />

        <TopBarContainer
          title="Activities"
          shadow={this.state.dropShadow}
          TopBarDropdown={ActivityTypeDropdown}
        />
        <div className="u-center-vh">
          <div className="weird-joyride-anchor" style={{ width: 0, height: 0, marginTop: '10px' }}/>
        </div>
        <div className="u-scroll-container">
          <div className="activities u-content-container">
            <AlertBar
              visible={showFocusConfigurationHelp}
              text="To block an activity while in focus,
              open the edit dialog of the activity and
              enable the Block in Focus Mode option."
              type="info"
              onCloseRequest={() => {
                this.setState({
                  showFocusConfigurationHelp: false,
                });
              }}
            />
            <div className="activities__switch">
              <span className="activities__switch__text"> SHOW ONLY UNCATEGORIZED </span>
              <Switch
                enabled={true}
                active={this.props.activeActivityTypeId === 'unassigned'}
                onToggleSwitch={() => {
                  if (this.props.activeActivityTypeId !== 'unassigned') {
                    this.props.setActiveActivityTypeId('unassigned');
                  } else {
                    this.props.setActiveActivityTypeId('all');
                  }
                }}
              />
            </div>
            <div className="activities__content u-card">
              <div className="activities__content__header">
                <h3 className="u-card__header">ACTIVITY</h3>
                <h3 className="u-card__header">TOTAL</h3>
              </div>
              <div className="activities__content__list">
                {map(shownActivities, (activity, index) =>
                  (
                    <ActivityContainer
                      className={index % 2
                        ? 'activities__content__list__item--even'
                        : 'activities__content__list__item--odd'
                      }
                      forceShowControlButtons={index === 0 && !completedActivitiesWalkthrough}
                      key={activity.activityId}
                      activity={activity}
                      setEditActivityId={this.setEditActivityId}
                    />
                  ),
                )}
              </div>
              {numberOfActivitiesToShow < activities.length && (
                <div className="activities__content__show-more">
                  <span className="u-text-button" onClick={() => showMoreActivitiesAction()}>
                    SHOW MORE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          open={editModalOpen}
          onCloseRequest={this.toggleEditModal}
          title={modalTitle}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editActivity &&
              <div className="edit-modal__content">
                <div className="edit-modal__content__row">
                  <div className="edit-modal__content__row__title">
                    Track Idle <span
                      data-multiline={true}
                      data-tip={`If clearminute detects that the user is idle, it stops
                      tracking time.  <br /> If you enable this option, tracking time for ${editActivity.title} <br />
                      will continue even when user idle / inactivity is detected. <br />
                      (good for youtube, movie or book apps).`}
                      data-for="inactivity__tooltip"
                      className="u-clickable edit-modal__content__row__help-button"
                    >
                      <InlineSVG src={helpIcon} />
                    </span>
                    <ReactTooltip id="inactivity__tooltip" multiline={true} />
                  </div>
                  <Switch
                    className="edit-modal__content__row__action"
                    active={editActivity.isAlwaysActive || editActivity.type === 'youtube'}
                    onToggleSwitch={() => toggleAlwaysactiveActivityAsync(editActivity)}
                    enabled={editActivity.type !== 'youtube'}
                  />
                </div>
                <div className="edit-modal__content__row">
                  <div className="edit-modal__content__row__title">
                    Block in Focus Mode <span
                      data-multiline={true}
                      data-tip={`If enabled, it will prevent opening ${editActivity.title}
                      in focus mode. <br />
                      Enabled by default for distracting activities. <br />
                      You can change the default behaviour here.`}
                      data-for="block__tooltip"
                      className="u-clickable edit-modal__content__row__help-button"
                    >
                      <InlineSVG src={helpIcon} />
                    </span>
                    <ReactTooltip id="block__tooltip" multiline={true} />
                  </div>
                  <Switch
                    className="edit-modal__content__row__action"
                    active={editActivity.isDisableInFocus || editActivity.type === 'youtube'}
                    onToggleSwitch={() => toggleDisableInFocusActivityAsync(editActivity)}
                    enabled={editActivity.type !== 'youtube'}
                  />
                </div>
                {editActivity.type === 'youtube' && (
                  <p style={{ color: '#ef6765' }}>
                    Currently, you can only change productivity of youtube activities.
                  </p>
                )}
              </div>
            }
            <div className="u-spacer-20" />
            <Button
              label="Close"
              inverted={true}
              onClick={this.toggleEditModal}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

Activities.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    activityId: PropTypes.string.isRequired,
  })),
  completedActivitiesWalkthrough: PropTypes.bool.isRequired,
  activeActivityTypeId: PropTypes.string.isRequired,
  numberOfActivitiesToShow: PropTypes.number.isRequired,
  loadActivitiesActionsAsync: PropTypes.func.isRequired,
  showMoreActivitiesAction: PropTypes.func.isRequired,
  resetActivitiesFiltersAction: PropTypes.func.isRequired,
  toggleAlwaysactiveActivityAsync: PropTypes.func.isRequired,
  toggleDisableInFocusActivityAsync: PropTypes.func.isRequired,
  completeActivitiesWalkthroughActionAsync: PropTypes.func.isRequired,
  setActiveActivityTypeId: PropTypes.func.isRequired,
};

Activities.defaultProps = {
  activities: [],
};

export default Activities;
