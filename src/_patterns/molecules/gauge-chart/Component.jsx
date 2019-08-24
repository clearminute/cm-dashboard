// Externals (A-z)
import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import {
  PRODUCTIVE_KEY,
  SLIGHTLY_PRODUCTIVE_KEY,
  NEUTRAL_KEY,
  SLIGHTLY_DISTRACTING_KEY,
  DISTRACTING_KEY,
} from 'clearminute/common/constants/constants';
import convertToDisplayTime from 'clearminute/common/utils/convertToDisplayTime';


class GaugeChart extends React.Component {
  constructor(props) {
    super(props);
    this.radius = props.size / 2;
  }

  calculateEndX(percentage) {
    const angle = 180 * (percentage / 100);
    const radians = angle * (Math.PI / 180);

    return this.radius - (this.radius * Math.cos(radians));
  }

  calculateEndY(percentage) {
    const a = this.radius;
    const b = this.radius - this.calculateEndX(percentage);
    const c = Math.sqrt((a ** 2) - (b ** 2));

    return this.radius - c;
  }

  render() {
    const {
      gaugePercentage,
      gaugeData,
      totalTime,
      size,
    } = this.props;

    const percentageProductive = gaugeData[PRODUCTIVE_KEY].value * 100;
    const percentageSlightlyProductive = gaugeData[SLIGHTLY_PRODUCTIVE_KEY].value * 100;
    const percentageSlightlyDistracting = gaugeData[SLIGHTLY_DISTRACTING_KEY].value * 100;
    const percentageNeutral = gaugeData[NEUTRAL_KEY].value * 100;

    const endXProductive = this.calculateEndX(percentageProductive);
    const endYProductive = this.calculateEndY(percentageProductive);

    const endXSlightlyProductive = this.calculateEndX(percentageProductive + percentageSlightlyProductive);
    const endYSlightlyProductive = this.calculateEndY(percentageProductive + percentageSlightlyProductive);

    const endXNeutral = this.calculateEndX(percentageProductive + percentageSlightlyProductive + percentageNeutral);
    const endYNeutral = this.calculateEndY(percentageProductive + percentageSlightlyProductive + percentageNeutral);

    const endXSlightlyDistracting = this.calculateEndX(
      percentageProductive + percentageSlightlyProductive + percentageNeutral + percentageSlightlyDistracting,
    );
    const endYSlightlyDistracting = this.calculateEndY(
      percentageProductive + percentageSlightlyProductive + percentageNeutral + percentageSlightlyDistracting,
    );

    if (totalTime === '0m') {
      return (
        <div className="gauge-chart">
          <svg width={size} height={size / 2} className="gauge-chart__svg">
            <defs>
              <linearGradient id="GradientNeutral">
                <stop stopColor="#EDF0F8" offset="0%" />
                <stop stopColor="#FBFCFD" offset="100%" />
              </linearGradient>
            </defs>
            <path
              d={`
                M${endXNeutral} ${endYNeutral}
                A ${this.radius} ${this.radius}, 0, 0, 1, ${2 * this.radius} ${this.radius}
              `}
              className="gauge-chart__path"
              stroke="url(#GradientNeutral)"
            />
          </svg>
          <div className="gauge-chart__info">
            <p className="gauge-chart__info__percentage"> {gaugePercentage} </p>
            <p className="gauge-chart__info__totalTime"> {totalTime} </p>
          </div>
        </div>
      );
    }

    return (
      <div className="gauge-chart">
        <svg width={size} height={size / 2} className="gauge-chart__svg">
          <defs>
            <linearGradient id="GradientProductive">
              <stop stopColor="#3C81DE" offset="0%" />
              <stop stopColor="#3C81DE" offset="100%" />
            </linearGradient>
            <linearGradient id="GradientSlightlyProductive">
              <stop stopColor="#7dabe9" offset="0%" />
              <stop stopColor="#7dabe9" offset="100%" />
            </linearGradient>
            <linearGradient id="GradientNeutral">
              <stop stopColor="#f5f6fa" offset="0%" />
              <stop stopColor="#f5f6fa" offset="100%" />
            </linearGradient>
            <linearGradient id="GradientSlightlyDistracting">
              <stop stopColor="#f6abaa" offset="0%" />
              <stop stopColor="#f6abaa" offset="100%" />
            </linearGradient>
            <linearGradient id="GradientDistracting">
              <stop stopColor="#ef6765" offset="0%" />
              <stop stopColor="#ef6765" offset="100%" />
            </linearGradient>
          </defs>
          <path
            d={`
              M0 ${this.radius}
              A ${this.radius} ${this.radius}, 0, 0, 1, ${endXProductive} ${endYProductive}
            `}
            className="gauge-chart__path"
            stroke="url(#GradientProductive)"
            data-tip={`Productive: ${convertToDisplayTime(gaugeData[PRODUCTIVE_KEY].seconds)}`}
            data-for="tooltip__gauge-chart"
          />
          <path
            d={`
              M${endXProductive} ${endYProductive}
              A ${this.radius} ${this.radius}, 0, 0, 1, ${endXSlightlyProductive} ${endYSlightlyProductive}
            `}
            className="gauge-chart__path"
            stroke="url(#GradientSlightlyProductive)"
            data-tip={`Slightly Productive: ${convertToDisplayTime(gaugeData[SLIGHTLY_PRODUCTIVE_KEY].seconds)}`}
            data-for="tooltip__gauge-chart"
          />
          <path
            d={`
              M${endXSlightlyProductive} ${endYSlightlyProductive}
              A ${this.radius} ${this.radius}, 0, 0, 1, ${endXNeutral} ${endYNeutral}
            `}
            className="gauge-chart__path"
            stroke="url(#GradientNeutral)"
            data-tip={`Neutral: ${convertToDisplayTime(gaugeData[NEUTRAL_KEY].seconds)}`}
            data-for="tooltip__gauge-chart"
          />
          <path
            d={`
              M${endXNeutral} ${endYNeutral}
              A ${this.radius} ${this.radius}, 0, 0, 1, ${endXSlightlyDistracting} ${endYSlightlyDistracting}
            `}
            className="gauge-chart__path"
            stroke="url(#GradientSlightlyDistracting)"
            data-tip={`Slightly Distracting: ${convertToDisplayTime(gaugeData[SLIGHTLY_DISTRACTING_KEY].seconds)}`}
            data-for="tooltip__gauge-chart"
          />
          <path
            d={`
              M${endXSlightlyDistracting} ${endYSlightlyDistracting}
              A ${this.radius} ${this.radius}, 0, 0, 1, ${2 * this.radius} ${this.radius}
            `}
            className="gauge-chart__path"
            stroke="url(#GradientDistracting)"
            data-tip={`Distracting: ${convertToDisplayTime(gaugeData[DISTRACTING_KEY].seconds)}`}
            data-for="tooltip__gauge-chart"
          />
        </svg>
        <ReactTooltip id="tooltip__gauge-chart" />
        <div className="gauge-chart__info">
          <p className="gauge-chart__info__percentage"> {gaugePercentage}<span className="percentage-sign">%</span></p>
          <p className="gauge-chart__info__totalTime"> {totalTime} </p>
        </div>
      </div>
    );
  }
}

GaugeChart.propTypes = {
  size: PropTypes.number,
  gaugePercentage: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired,
  gaugeData: PropTypes.object.isRequired,
};

GaugeChart.defaultProps = {
  size: 215,
};

export default GaugeChart;
