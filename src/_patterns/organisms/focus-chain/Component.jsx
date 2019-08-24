import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import InlineSVG from 'react-inlinesvg';

import convertToDisplayTime from '../../../common/utils/convertToDisplayTime';
import heartIcon from 'clearminute/styles/svg/heart.svg';


class FocusChain extends React.Component {
  constructor(props) {
    super(props);
    this.months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    this.state = {
      display: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.timePerDay.size === 0 && nextProps.timePerDay.size > 0) {
      return true;
    }

    if (this.state.display === false && nextState.display === true) {
      return true;
    }

    return false;
  }

  getColor(value = 0) {
    const minValue = 10;

    if (value >= minValue * 60 && value < 60 * 60) {
      return '#91b0d8';
    }

    if (value > 60 * 60 && value < 120 * 60) {
      return '#6f9edb';
    }

    if (value > 120 * 60) {
      return '#266ecc';
    }

    if (value > 240 * 60) {
      return '#174784';
    }

    return '#f5f6fa';
  }

  componentDidMount() {
    setTimeout(() => this.setState({ display: true }), 1500);
  }

  renderFocusChain() {
    const { timePerDay, handleChangeDate } = this.props;
    const now = new Date();
    const dayMillis = 24 * 60 * 60 * 1000;
    const views = [];
    let isToday = true;
    let loopIteration = 0;

    while (views.length === loopIteration) {
      const prevDay = views.length;
      const date = new Date(now.getTime() - (prevDay * dayMillis));
      let day = date.getDate().toString();
      let month = date.getMonth().toString();

      if (month.length === 1) {
        month = `0${month}`;
      }

      if (day.length === 1) {
        day = `0${day}`;
      }

      const year = date.getFullYear();
      const key = `${year}${month}${day}`;

      if (timePerDay.get(key) && timePerDay.get(key) > 1 * 60 * 59) {
        const el = (
          <div
            key={key}
            style={{ display: 'inline', margin: '10px' }}
            onClick={() => handleChangeDate(date)}
            data-tip={
              `${timePerDay.get(key)
                ? `${convertToDisplayTime(timePerDay.get(key))} focused time logged`
                : 'No focused time logged'} on ${this.months[date.getMonth()]} ${day}, ${year}`
            }
            data-for={key}
          >
            <InlineSVG src={heartIcon} className='focuschain__heart' />
            <ReactTooltip id={key} />
          </div>
        );

        views.push(el);
      }

      loopIteration += 1;

      // not reached 60 mins today, that's fine
      if (isToday && views.length === 0) {
        views.push(null);
      }

      isToday = false;
    }

    if (views.length === 1 && views.includes(null)) {
      return (
        <p className='focus__chain__description'>
          Consecutive days of more than 1 hour in focus mode will be displayed here.
        </p>
      );
    }

    return views.reverse();
  }

  render() {
    const { display } = this.state;

    return (
      <div className={`${this.props.className} focus__chain`}>
        <div className="focus__chain__header">
          <h3 className="focus__chain__header__title u-card__header">
            Focus Chain
          </h3>
        </div>
        {display && this.renderFocusChain()}
      </div>
    );
  }
}

FocusChain.propTypes = {
  className: PropTypes.string,
  handleChangeDate: PropTypes.func.isRequired,
  timePerDay: PropTypes.object.isRequired,
  activeDate: PropTypes.objectOf(Date).isRequired,
};

export default FocusChain;
