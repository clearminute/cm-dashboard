/* eslint-disable import/no-duplicates */
// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/es/constants';

// Internals (A-z);
import DayInsights from 'clearminute/_patterns/organisms/day-insights/Component';
import WeekInsights from 'clearminute/_patterns/organisms/week-insights/Component';
import FocusChainContainer from 'clearminute/_patterns/organisms/focus-chain/Container';
import GaugeChartContainer from 'clearminute/_patterns/molecules/gauge-chart/Container';
import DailyNavigationContainer from 'clearminute/_patterns/atoms/daily-navigation/Container';
import DailyTopActivitiesContainer from 'clearminute/_patterns/molecules/top-activities/DailyContainer';
import WeeklyTopActivitiesContainer from 'clearminute/_patterns/molecules/top-activities/WeeklyContainer';
import TopBarContainer from 'clearminute/_patterns/molecules/top-bar/Container';
import FocusTime from 'clearminute/_patterns/molecules/focus-time/Container';
import CategorizeActivity from 'clearminute/_patterns/molecules/categorize-activity/Container';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropShadow: false,
      run: false,
      steps: [
        {
          target: '.daily-navigation__content',
          content: `You're currently viewing insights for this day.
            Premium users can also navigate to days back in the past.`,
          placement: 'bottom',
        },
        {
          target: '.overview__daily__item--score',
          content: `This is your current productivity for the day.
            It is determined by the amount of time you spend
            on productive vs distracting activities.
            You can later customize which activities
            are distracting in your workflow`,
          placement: 'bottom',
        },
        {
          target: '.overview__daily__item--categorize',
          content: `For some activities we don't know the correct productivity level based
            on your workflow. Such activities that you frequently spend time on will be shown here.
            Taking time to categorize them will improve your productivity insights.`,
          placement: 'bottom',
        },
        {
          target: '.overview__daily__item--focustime',
          content: `Focus mode is powerful feature dedicated to enable you to do deeper work.
            We believe, that it's important to spend at least 1 hour a day on deep focused work.
            This is your current progress towards that goal.`,
          placement: 'bottom',
        },
        {
          target: '.overview__daily__item--hourly',
          content: `Here you can review what you did throughout each hour of the day.
            You can scroll through the rest of the 24 hours with the arrows on the sides.`,
          placement: 'bottom',
        },
        {
          target: '.focus__chain',
          content: `This card displays consecutive days of more than 1 hour deep focused work.
            We're excited to see the longest chain of blue hearts.
            Tweet us your screenshots @clearminute!`,
          placement: 'top',
        },
        {
          target: '.navigation__item--activities',
          content: 'Click here to navigate to activities and learn more!',
          placement: 'top',
        },
      ],
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { loadDailyStats, loadWeeklyStats, date } = this.props;

    const shouldRun = false;
    if (shouldRun) {
      this.setState({ run: true });
    }

    loadDailyStats(date);
    loadWeeklyStats(date);
    const scrollContainer = document.getElementsByClassName('u-scroll-container')[0];
    scrollContainer.addEventListener('scroll', this.handleScroll);
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
    if (tour.type === EVENTS.TOUR_END || tour.index === 6) {
      // this.props.onCompleteOverviewWalkthrough();
      // TODO
    }
  }

  render() {
    const shouldShowDownloadScreen = false; // TODO
    const TopBarNavigation = DailyNavigationContainer;

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
          title="Dashboard"
          shadow={this.state.dropShadow}
          TopBarNavigation={TopBarNavigation}
        />
        <div className="u-scroll-container">
          <div className="overview u-content-container">
            {shouldShowDownloadScreen && (
              <div className="u-card" style={{ marginBottom: '30px' }}>
                <h3 className="u-card__header">Missing daily report</h3>
                <p>
                  Seems like, your extension was not running on
                  that day and did not record any time.
                </p>
              </div>
            )}
            {!shouldShowDownloadScreen && (
              <div>
                <div className="overview__focus">
                  <FocusChainContainer className="u-card" />
                </div>
                <div className="overview__daily">
                  <div className="u-card overview__daily__item overview__daily__item--hourly">
                    <DayInsights className="overview__daily__item__content" />
                  </div>
                  <div className="u-card overview__daily__item overview__daily__item--score">
                    <h3 className="u-card__header">Daily Score</h3>
                    <GaugeChartContainer className="overview__daily__item__content" />
                  </div>
                  <div className="u-card overview__daily__item overview__daily__item--top5">
                    <h3 className="u-card__header">Top 5 Daily</h3>
                    <DailyTopActivitiesContainer className="overview__daily__item__content" />
                  </div>
                  <div className="u-card overview__daily__item overview__daily__item--focustime">
                    <FocusTime />
                  </div>
                  <div className="u-card overview__daily__item overview__daily__item--categorize">
                    <CategorizeActivity />
                  </div>
                </div>
              </div>
            )}
            <div className="overview__weekly">
              <WeekInsights className="u-card overview__weekly__item overview__weekly__item--insights" />
              <div className="u-card overview__weekly__item overview__weekly__item--top5">
                <h3 className="u-card__header">Top 5 Weekly</h3>
                <WeeklyTopActivitiesContainer className="overview__weekly__item__content" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  date: PropTypes.object.isRequired,
  loadDailyStats: PropTypes.func.isRequired,
  loadWeeklyStats: PropTypes.func.isRequired,
};

export default Overview;
