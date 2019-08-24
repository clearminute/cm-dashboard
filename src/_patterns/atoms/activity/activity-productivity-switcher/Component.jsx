// Externals - Others
import React from 'react';
import PropTypes from 'prop-types';
import CategorizeButtons from '../../categorize-buttons/Component';

class ActivityProductivitySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyChange = this.handleKeyChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyChange);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyChange);
  }

  handleKeyChange(key) {
    const {
      handleProductivityKeyChange,
      activity,
    } = this.props;

    if (['1', '2', '3', '4', '5'].includes(key)) {
      handleProductivityKeyChange(activity, key);
    }
  }

  render() {
    const {
      activity,
    } = this.props;

    let productivityKey = activity.productivityKey;
    if (productivityKey.includes('slightly')) {
      productivityKey = `Slightly ${productivityKey.split('slightly')[1]}`;
    }

    return (
      <div className="activity-productivity-switcher">
        <div className="activity-productivity-switcher__label">
          <CategorizeButtons
            activity={activity}
            handleProductivityKeyChange={key => this.handleKeyChange(String(key))}
          />
        </div>
      </div>
    );
  }
}

ActivityProductivitySwitcher.propTypes = {
  activity: PropTypes.shape({
    activityId: PropTypes.string.isRequired,
    productivityKey: PropTypes.string.isRequired,
  }).isRequired,
  handleProductivityKeyChange: PropTypes.func.isRequired,
};

export default ActivityProductivitySwitcher;
