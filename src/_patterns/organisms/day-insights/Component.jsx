// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';

// Internals (A-z)
import HourlyChartContainer from 'clearminute/_patterns/molecules/hourly-chart/Container';

class DayInsights extends React.Component {
  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`hourly-box ${className}`}>
        <h3 className="u-card__header">Productivity by hour</h3>
        <HourlyChartContainer />
      </div>
    );
  }
}

DayInsights.propTypes = {
  className: PropTypes.string,
};

DayInsights.defaultProps = {
  className: '',
};

export default DayInsights;
