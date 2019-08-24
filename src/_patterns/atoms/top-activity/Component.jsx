// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';

// Internals (A-z)
import Circle from 'clearminute/_patterns/atoms/circle/Circle';
import getColorFromProductivityKey from 'clearminute/common/utils/getColorFromProductiviyKey';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';


const TopActivity = (props) => {
  const {
    className,
    activity,
    blur,
  } = props;

  const displayTime = convertToDisplayTime(activity.seconds);

  let ActivityLabel = () => (
    <Circle
      className="top-activity__title"
      size={16}
      label={activity.title}
      backgroundColor={getColorFromProductivityKey(activity.productivityKey)}
    />
  );

  if (blur) {
    ActivityLabel = () => ( // eslint-disable-line react/display-name
      <div className="top-activity__title top-activity__title--placeholder" />
    );
  }

  return (
    <div className={`top-activity ${className}`}>
      <ActivityLabel />
      <div className="top-activity__time">
        {displayTime}
      </div>
    </div>
  );
};

TopActivity.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.shape({
    activityId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    productivityKey: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  blur: PropTypes.bool.isRequired,
};

TopActivity.defaultProps = {
  className: '',
  blur: false,
};

export default TopActivity;
