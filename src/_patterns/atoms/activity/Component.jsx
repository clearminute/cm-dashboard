// Externals - Others
import React from 'react';
import PropTypes from 'prop-types';

// Internals - Others
import ActivityProductivitySwitcherContainer from './activity-productivity-switcher/Container';
import ActivityTypeIcon from './activity-type-icon/Component';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  render() {
    const { activity, className, forceShowControlButtons } = this.props;

    let productivityKey = activity.productivityKey;
    if (productivityKey.includes('slightly')) {
      productivityKey = `Slightly ${productivityKey.split('slightly')[1]}`;
    }

    return (
      <div
        className={`activity ${className}`}
        onMouseEnter={() => this.setState({ isActive: true })}
        onMouseLeave={() => this.setState({ isActive: false })}
      >
        <div className="activity__content">
          <div className="activity__content__type">
            <ActivityTypeIcon type={activity.type} productivityKey={activity.productivityKey} />
          </div>
          <div className="activity__content__title">{activity.title}</div>
          <div className="activity__content__keyboard u-center-vh">
            {(this.state.isActive || forceShowControlButtons) && (
              <ActivityProductivitySwitcherContainer
                activity={activity}
                active={this.state.isActive}
              />
            )}
          </div>
          <span style={{ marginRight: '50px' }}> {convertToDisplayTime(activity.totalTime)} </span>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  className: PropTypes.string,
  forceShowControlButtons: PropTypes.bool,
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    productivityKey: PropTypes.string.isRequired,
    isAlwaysActive: PropTypes.bool.isRequired,
  }).isRequired,
  setEditActivityId: PropTypes.func.isRequired,
};

Activity.defaultProps = {
  className: '',
  forceShowControlButtons: false,
};

export default Activity;
