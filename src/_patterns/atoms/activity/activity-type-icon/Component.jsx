// Externals - Others
import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

// Internals - Others
import activityTypeIcon from 'clearminute/styles/svg/activity-type-icon.svg';
import websiteTypeIcon from 'clearminute/styles/svg/website-type-icon.svg';
import youtubeTypeIcon from 'clearminute/styles/svg/youtube-type-icon.svg';
import redditTypeIcon from 'clearminute/styles/svg/reddit-type-icon.svg';
import {
  PRODUCTIVE_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  NEUTRAL_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  DISTRACTING_KEY,
  UNASSIGNED_KEY,
} from 'clearminute/common/constants/constants';

const createTypeIconClass = (productivityKey) => {
  switch (productivityKey) {
    case PRODUCTIVE_KEY:
      return 'activity-type-icon--productive';
    case SLIGHTLY_PRODUCTIVE_KEY:
      return 'activity-type-icon--slightlyProductive';
    case DISTRACTING_KEY:
      return 'activity-type-icon--distracting';
    case SLIGHTLY_DISTRACTING_KEY:
      return 'activity-type-icon--slightlyDistracting';
    case NEUTRAL_KEY:
    case UNASSIGNED_KEY:
      return 'activity-type-icon--neutral';
    default:
      console.error('Unhandled productivity key', productivityKey); // eslint-disable-line
      return 'activity-type-icon--neutral';
  }
};

const createIconForType = (type) => {
  switch (type) {
    case 'app':
      return activityTypeIcon;
    case 'website':
      return websiteTypeIcon;
    case 'youtube':
      return youtubeTypeIcon;
    case 'reddit':
      return redditTypeIcon;
    default:
      console.error('Unhandled productivity key', type); // eslint-disable-line
      return activityTypeIcon;
  }
};

class ActivityTypeIcon extends React.Component {
  render() {
    const {
      type,
      productivityKey,
    } = this.props;

    const typeIconClass = createTypeIconClass(productivityKey);

    return (
      <div className={`activity-type-icon u-center-vh ${typeIconClass}`}>
        <InlineSVG src={createIconForType(type)} />
      </div>
    );
  }
}

ActivityTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  productivityKey: PropTypes.string.isRequired,
};

export default ActivityTypeIcon;
