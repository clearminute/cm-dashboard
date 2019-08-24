// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';

// Internals (A-z)
import WeekdayChartContainer from 'clearminute/_patterns/molecules/weekday-chart/Container';


class WeekInsights extends React.Component {
  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`${className}`}>
        <h3 className="u-card__header">Weekly Insights</h3>
        <WeekdayChartContainer />
      </div>
    );
  }
}

WeekInsights.propTypes = {
  className: PropTypes.string,
};

WeekInsights.defaultProps = {
  className: '',
};

export default WeekInsights;
