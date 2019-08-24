// Externals (A-z)
import map from 'lodash/map';
import each from 'lodash/each';
import HourBar from 'clearminute/_patterns/atoms/productivity-bar/HourBar';
import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import ReactTooltip from 'react-tooltip';

// Internals (A-z)
import arrowLeft from 'clearminute/styles/svg/arrow-left.svg';
import arrowRight from 'clearminute/styles/svg/arrow-right.svg';
import convertSecondsToMinutes from 'clearminute/common/utils/convertSecondsToMinutes';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';

const MAX_BAR_HEIGHT = 140;
const SECONDS_IN_HOUR = 3600;

class HourlyChart extends React.Component {
  getBarHeight(seconds) {
    return `${((seconds * MAX_BAR_HEIGHT) / SECONDS_IN_HOUR)}px`;
  }

  getTooltipContent(mostActiveActivities) {
    if (mostActiveActivities.length === 0) {
      return 'No activity found';
    }
    let content = 'Top hourly activities: <br /><br />';
    each(mostActiveActivities, ({ title, seconds }) => {
      content += `${title} - ${convertToDisplayTime(seconds)} <br />`;
    });

    return content;
  }

  render() {
    const {
      stats,
      statsDirty,
      className,
      activeHour,
      previousPageActiveHour,
      nextPageActiveHour,
      setActiveHour,
    } = this.props;

    const navigationLeftInactive =
      activeHour === previousPageActiveHour ? 'hourly-chart__navigation--inactive' : '';

    const navigationRightInactive =
      activeHour === nextPageActiveHour ? 'hourly-chart__navigation--inactive' : '';

    return (
      <div className={`hourly-chart ${className}`}>
        {!statsDirty &&
        <div className="hourly-chart__container">
          <div
            className={`hourly-chart__navigation hourly-chart__navigation--left ${navigationLeftInactive}`}
            onClick={() => { setActiveHour(previousPageActiveHour); }}
            data-tip={navigationLeftInactive ? '' : 'Earlier this day'}
          >
            <InlineSVG src={arrowLeft} />
          </div>
          <div className="hourly-chart__bar-chart">
            <div className="hourly-chart__bar-chart__stripes">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            {
              map(stats, ({
                hour,
                productive,
                slightlyProductive,
                neutral,
                unassigned,
                slightlyDistracting,
                distracting,
                mostActiveActivities,
              }, index) => (
                <HourBar
                  key={index}
                  hour={hour.toString()}
                  productivityHeights={{
                    productive: this.getBarHeight(productive),
                    slightlyProductive: this.getBarHeight(slightlyProductive),
                    neutral: this.getBarHeight(neutral + unassigned),
                    slightlyDistracting: this.getBarHeight(slightlyDistracting),
                    distracting: this.getBarHeight(distracting),
                  }}
                  minutes={convertSecondsToMinutes(
                    productive + distracting + neutral + unassigned + slightlyProductive + slightlyDistracting,
                  )}
                  width="45px"
                  tooltipContent={this.getTooltipContent(mostActiveActivities)}
                />
              ))
            }
          </div>
          <div
            className={`hourly-chart__navigation hourly-chart__navigation--right ${navigationRightInactive}`}
            onClick={() => { setActiveHour(nextPageActiveHour); }}
            data-tip={navigationRightInactive ? '' : 'Later this day'}
          >
            <InlineSVG src={arrowRight} />
          </div>

          <ReactTooltip />
        </div>}
      </div>
    );
  }
}

HourlyChart.propTypes = {
  className: PropTypes.string,
  activeHour: PropTypes.number.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape({
    hour: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  })),
  statsDirty: PropTypes.bool,
  previousPageActiveHour: PropTypes.number.isRequired,
  nextPageActiveHour: PropTypes.number.isRequired,
  setActiveHour: PropTypes.func.isRequired,
};

HourlyChart.defaultProps = {
  className: '',
  stats: [],
};

export default HourlyChart;
