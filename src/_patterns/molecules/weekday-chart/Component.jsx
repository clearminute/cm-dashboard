// Externals (A-z)
import { map, each } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import ReactTooltip from 'react-tooltip';

// Internals (A-z)
import DayBar from 'clearminute/_patterns/atoms/productivity-bar/DayBar';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';
import getBarHeight from './getBarHeight';
import getPrevWeekSunday from 'clearminute/common/utils/getPrevWeekSunday';
import getNextMonday from 'clearminute/common/utils/getNextWeekMonday';
import arrowLeft from 'clearminute/styles/svg/arrow-left.svg';
import arrowRight from 'clearminute/styles/svg/arrow-right.svg';

const days = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

class WeekdayChart extends React.Component {
  render() {
    const { stats, className, currentDay, handleChangeDate, activeDate } = this.props;

    if (!stats) {
      return <div> Weekly empty </div>;
    }

    let maxSeconds = 0;
    each(stats, ({ totalTime }) => {
      if (maxSeconds < totalTime) {
        maxSeconds = totalTime;
      }
    });

    const nextMonday = getNextMonday(activeDate);
    const previousSunday = getPrevWeekSunday(activeDate);

    const inactiveClassLeft = '';
    let inactiveClassRight = '';

    const nextMondayIsFuture = nextMonday > new Date();

    if (nextMondayIsFuture) {
      inactiveClassRight = 'weekday-chart__navigation--inactive';
    }

    return (
      <div className={`weekday-chart ${className}`}>
        {stats.length !== 0 && (
          <div className="weekday-chart__bar-chart">
            <div className="weekday-chart__bar-chart__stripes">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <React.Fragment>
              <div
                className="weekday-chart__navigation weekday-chart__navigation--left"
                onClick={() => handleChangeDate(previousSunday)}
                data-tip={'Previous Week (Sunday)'}
                data-for="tooltip__weekday-chart--left"
              >
                <InlineSVG src={arrowLeft} />
              </div>
              {map(
                stats,
                (
                  {
                    day,
                    productive,
                    neutral,
                    slightlyProductive,
                    slightlyDistracting,
                    distracting,
                    totalTime,
                    unassigned,
                  },
                  index,
                ) => (
                  <div key={index}>
                    <DayBar
                      onClick={() => handleChangeDate(activeDate, days[day] - days[currentDay])}
                      weekday={day.substring(0, 2)}
                      productivityHeights={{
                        productive: getBarHeight(productive, maxSeconds),
                        slightlyProductive: getBarHeight(slightlyProductive, maxSeconds),
                        neutral: getBarHeight(neutral + unassigned, maxSeconds),
                        slightlyDistracting: getBarHeight(slightlyDistracting, maxSeconds),
                        distracting: getBarHeight(distracting, maxSeconds),
                      }}
                      totalTime={convertToDisplayTime(totalTime)}
                      selected={currentDay === day}
                      width="60px"
                      clickable={true}
                      blackWhite={false}
                    />
                  </div>
                ),
              )}
              <div
                className={`weekday-chart__navigation weekday-chart__navigation--right ${inactiveClassRight}`}
                onClick={nextMondayIsFuture ? () => null : () => handleChangeDate(nextMonday)}
                data-tip={'Next Week (Monday)'}
                data-for="tooltip__weekday-chart--right"
              >
                <InlineSVG src={arrowRight} />
              </div>
              {!inactiveClassLeft && <ReactTooltip id="tooltip__weekday-chart--left" />}
              {!inactiveClassRight && <ReactTooltip id="tooltip__weekday-chart--right" />}
            </React.Fragment>
          </div>
        )}
      </div>
    );
  }
}

WeekdayChart.propTypes = {
  className: PropTypes.string,
  stats: PropTypes.array,
  statsDirty: PropTypes.bool,
  currentDay: PropTypes.string,
  activeDate: PropTypes.objectOf(Date).isRequired,
  handleChangeDate: PropTypes.func.isRequired,
};

WeekdayChart.defaultProps = {
  className: '',
  stats: [],
};

export default WeekdayChart;
