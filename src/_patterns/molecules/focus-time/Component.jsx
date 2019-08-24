import * as React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import InlineSVG from 'react-inlinesvg';

import helpIcon from 'clearminute/styles/svg/help-icon.svg';

const minutes = 60;

class FocusTime extends React.Component {
  constructor(props) {
    super(props);
    this.radius = props.size / 2;
  }

  calculateEndX(percentage) {
    const angle = 180 * (percentage / 100);
    const radians = angle * (Math.PI / 180);

    return this.radius - this.radius * Math.cos(radians);
  }

  calculateEndY(percentage) {
    const a = this.radius;
    const b = this.radius - this.calculateEndX(percentage);
    const c = Math.sqrt(a ** 2 - b ** 2);

    return this.radius - c;
  }

  componentDidMount() {
    const { loadFocusTimeActionAsync } = this.props;
    loadFocusTimeActionAsync();
  }

  render() {
    const { totalFocusTime, size } = this.props;
    const totalFocusTimePercntage = Math.min(100, Math.floor((100 * totalFocusTime) / minutes));
    const endXFocus = this.calculateEndX(totalFocusTimePercntage);
    const endYFocus = this.calculateEndY(totalFocusTimePercntage);

    return (
      <div className="focus-time">
        <h3 className="u-card__header"> {"Today's Focus"} </h3>
        <span
          data-multiline={true}
          data-tip="Only deep focus sessions longer than 25 minutes will be depicted here. <br />
          Anything less than that is considered shallow focus and will be ignored."
          data-for="focus-time__tooltip"
          className="focus-time__help-icon-wrapper"
        >
          <InlineSVG src={helpIcon} />
        </span>
        <ReactTooltip id="focus-time__tooltip" multiline={true} />
        <div className="focus-time__content">
          <div className="gauge-chart">
            <svg width={size} height={size / 2} className="gauge-chart__svg">
              <defs>
                <linearGradient id="GradientProductive">
                  <stop stopColor="#3476CC" offset="0%" />
                  <stop stopColor="#3476CC" offset="100%" />
                </linearGradient>
                <linearGradient id="GradientNeutral">
                  <stop stopColor="#EDF0F8" offset="0%" />
                  <stop stopColor="#EDF0F8" offset="100%" />
                </linearGradient>
              </defs>
              <path
                d={`
                  M0 ${this.radius}
                  A ${this.radius} ${this.radius}, 0, 0, 1, ${endXFocus} ${endYFocus}
                `}
                className="gauge-chart__path"
                stroke="url(#GradientProductive)"
              />
              <path
                d={`
                  M${endXFocus} ${endYFocus}
                  A ${this.radius} ${this.radius}, 0, 0, 1, ${2 * this.radius} ${this.radius}
                `}
                className="gauge-chart__path"
                stroke="url(#GradientNeutral)"
              />
            </svg>
          </div>
          <div className="focus-time__current-minutes">{totalFocusTime}</div>
          <div className="focus-time__minutes-label">minutes</div>
        </div>
      </div>
    );
  }
}

FocusTime.propTypes = {
  loadFocusTimeActionAsync: PropTypes.func.isRequired,
  totalFocusTime: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

FocusTime.defaultProps = {
  size: 215,
};

export default FocusTime;
