// Externals - Others
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';

import editIcon from 'clearminute/styles/svg/edit.svg';


class ActivitySettingsButton extends React.Component {
  render() {
    const {
      activity,
      setEditActivityId,
    } = this.props;

    return (
      <div
        className="activity-settings-button u-center-vh"
        onClick={() => setEditActivityId(activity.activityId)}
      >
        <InlineSVG src={editIcon} />
      </div>
    );
  }
}

ActivitySettingsButton.propTypes = {
  activity: PropTypes.shape({
    activityId: PropTypes.string.isRequired,
  }),
  setEditActivityId: PropTypes.func.isRequired,
};

export default ActivitySettingsButton;
