// Externals (A-z)
import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';

import Circle from 'clearminute/_patterns/atoms/circle/Circle';
import getColorFromProductivityKey from 'clearminute/common/utils/getColorFromProductiviyKey';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';


class HourlyInfo extends React.Component {
  render() {
    const {
      stats,
      statsDirty,
      className,
    } = this.props;

    return (
      <div className={`hourly-info ${className}`}>
        <div>
          <div className="hourly-info__header">
            <h3 className="hourly-info__header__title u-card__header">Day Insights</h3>
          </div>
          <div className="hourly-info__activities">
            <div className="hourly-info__activities__body">
              {!statsDirty && (
                <div className="hourly-info__activities__header"> Top 3 Hourly Activities </div>
              )}

              {!statsDirty && stats && map(stats.mostActiveActivities, (activity, index) => (
                <div className="hourly-info__activities__row" key={index}>
                  <div className="hourly-info__activities__title">
                    <Circle
                      size={16}
                      label={activity.title}
                      backgroundColor={getColorFromProductivityKey(activity.productivityKey)}
                    />
                  </div>
                  <div className="hourly-info__activities__time" >{convertToDisplayTime(activity.seconds)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HourlyInfo.propTypes = {
  className: PropTypes.string,
  stats: PropTypes.shape({
    mostActiveActivities: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })).isRequired,
  }),
  statsDirty: PropTypes.bool,
};

HourlyInfo.defaultProps = {
  className: '',
  stats: null,
};

export default HourlyInfo;
