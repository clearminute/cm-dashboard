import React from 'react';
import PropTypes from 'prop-types';

import Bar from './bar/Component';


export default class DayBar extends React.Component {
  render() {
    const {
      weekday,
      width,
      productivityHeights,
      totalTime,
      selected,
      onClick,
      clickable,
      blackWhite,
    } = this.props;

    let className = 'daybar ';

    if (selected) {
      className += 'daybar--selected';
    }

    return (
      <div className={className}>
        <Bar
          onClick={onClick}
          clickable={clickable}
          labelTop={totalTime}
          labelBottom={weekday}
          width={width}
          productivityHeights={productivityHeights}
          blackWhite={blackWhite}
        />
      </div>
    );
  }
}

DayBar.propTypes = {
  weekday: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  productivityHeights: PropTypes.object.isRequired,
  totalTime: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  clickable: PropTypes.bool.isRequired,
  blackWhite: PropTypes.bool.isRequired,
};

DayBar.defaultProps = {
  clickable: true,
  blackWhite: false,
};
