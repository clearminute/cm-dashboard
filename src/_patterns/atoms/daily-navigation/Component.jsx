import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

import arrowLeft from 'clearminute/styles/svg/arrow-left.svg';
import arrowRight from 'clearminute/styles/svg/arrow-right.svg';
import formatDate from 'clearminute/common/utils/formatDate';
import getMonthName from 'clearminute/common/utils/getMonthName';

class DailyNavigation extends React.Component {
  render() {
    const { activeDate, handleChangeDate } = this.props;

    const isCurrentDate = formatDate(activeDate, 'YYYYMMDD') === formatDate(new Date(), 'YYYYMMDD');

    let inactiveClass = '';
    if (isCurrentDate) {
      inactiveClass = 'daily-navigation__arrow--inactive';
    }

    return (
      <div className="daily-navigation">
        <div className="daily-navigation__content">
          <div
            className="daily-navigation__arrow daily-navigation__arrow--left"
            onClick={() => {
              handleChangeDate(activeDate, -1);
            }}
          >
            <InlineSVG src={arrowLeft} />
          </div>
          <div className="daily-navigation__day">
            {activeDate.getDate()} {getMonthName(activeDate)}
          </div>
          <div
            className={`daily-navigation__arrow daily-navigation__arrow--right ${inactiveClass}`}
            onClick={() => {
              if (!isCurrentDate) {
                handleChangeDate(activeDate, 1);
              }
            }}
          >
            <InlineSVG src={arrowRight} />
          </div>
        </div>
      </div>
    );
  }
}

DailyNavigation.propTypes = {
  activeDate: PropTypes.objectOf(Date).isRequired,
  handleChangeDate: PropTypes.func.isRequired,
};

export default DailyNavigation;
