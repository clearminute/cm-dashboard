import * as React from 'react';
import PropTypes from 'prop-types';
import CategorizeButtons from '../../atoms/categorize-buttons/Component';

class CategorizeActivity extends React.Component {
  render() {
    const { date, activity, handleProductivityKeyChange } = this.props;

    return (
      <div>
        <h3 className="u-card__header"> Quick categorize </h3>
        <div>
          {activity === null && (
            <div className="u-center-vh" style={{ height: '170px' }}>
              <p className="categorize-activity__description">Nothing to categorize</p>
              <span style={{ marginLeft: '10px' }}> 🎉 </span>
            </div>
          )}
        </div>
        {activity && (
          <div className="categorize-activity__categorization">
            <h4 className="categorize-activity__description">
              {activity.title}
            </h4>
            <CategorizeButtons handleProductivityKeyChange={key => handleProductivityKeyChange(key, activity, date)} />
          </div>
        )}
      </div>
    );
  }
}

CategorizeActivity.propTypes = {
  date: PropTypes.object.isRequired,
  handleProductivityKeyChange: PropTypes.func.isRequired,
  activity: PropTypes.object,
};

export default CategorizeActivity;
