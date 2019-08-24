// Externals (A-z)
import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';

// Internals (A-z)
import TopActivity from 'clearminute/_patterns/atoms/top-activity/Component';


class TopActivities extends React.Component {
  render() {
    const {
      className,
      topActivities,
      statsDirty,
      blur,
    } = this.props;

    return (
      <div className={`top-activities ${className}`}>
        {!statsDirty && topActivities.length === 0 && (
          <span />
        )}

        {!statsDirty && topActivities.length > 0 && map(topActivities, (activity, index) =>
          <TopActivity
            key={index}
            className="top-activities__item"
            activity={activity}
            blur={blur}
          />,
        )}
      </div>
    );
  }
}

TopActivities.propTypes = {
  className: PropTypes.string,
  topActivities: PropTypes.arrayOf(PropTypes.shape({
    activityId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    productivityKey: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired,
  })).isRequired,
  statsDirty: PropTypes.bool.isRequired,
  blur: PropTypes.bool.isRequired,
};

TopActivities.defaultProps = {
  className: '',
  statsDirty: false,
  blur: false,
};

export default TopActivities;
