import React from 'react';
import PropTypes from 'prop-types';

import Bar from './bar/Component';

export default class HourBar extends React.Component {
  render() {
    const {
      hour,
      width,
      productivityHeights,
      minutes,
      tooltipContent,
    } = this.props;

    let labelBottom;
    if (hour % 2 === 0) {
      labelBottom = '';
    } else if (hour >= 1 && hour <= 11) {
      labelBottom = `${hour} AM`;
    } else {
      labelBottom = `${hour % 12} PM`;
    }

    return (
      <div className="hourbar">
        <Bar
          labelTop={minutes > 0 ? `${minutes}m` : ''}
          labelBottom={labelBottom}
          width={width}
          productivityHeights={productivityHeights}
          tooltipContent={tooltipContent}
        />
      </div>
    );
  }
}

HourBar.propTypes = {
  hour: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  productivityHeights: PropTypes.object.isRequired,
  minutes: PropTypes.number.isRequired,
  tooltipContent: PropTypes.string.isRequired,
};
