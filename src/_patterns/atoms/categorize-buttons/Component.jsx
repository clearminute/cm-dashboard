import * as React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

class CategorizeButtons extends React.Component {
  render() {
    const { handleProductivityKeyChange } = this.props;

    return (
      <div>
        <ReactTooltip id="categorize__buttons-activity" />
        <button
          data-tip="Distracting"
          data-for="categorize__buttons-activity"
          onClick={() => handleProductivityKeyChange(5)}
          className="categorize-activity__button categorize-activity__button--distracting">
        </button>
        <button
          data-tip="Slightly Distracting"
          data-for="categorize__buttons-activity"
          onClick={() => handleProductivityKeyChange(4)}
          className="categorize-activity__button categorize-activity__button--slightlyDistracting">
        </button>
        <button
          data-tip="Neutral"
          data-for="categorize__buttons-activity"
          onClick={() => handleProductivityKeyChange(3)}
          className="categorize-activity__button categorize-activity__button--neutral">
        </button>
        <button
          data-tip="Slightly Productive"
          data-for="categorize__buttons-activity"
          onClick={() => handleProductivityKeyChange(2)}
          className="categorize-activity__button categorize-activity__button--slightlyProductive">
        </button>
        <button
          data-tip="Productive"
          data-for="categorize__buttons-activity"
          onClick={() => handleProductivityKeyChange(1)}
          className="categorize-activity__button categorize-activity__button--productive">
        </button>
      </div>
    );
  }
}

CategorizeButtons.propTypes = {
  handleProductivityKeyChange: PropTypes.func.isRequired,
};

export default CategorizeButtons;
