import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import withBlur from 'clearminute/_patterns/atoms/with-blur/Component';

export default class Bar extends React.Component {
  render() {
    const {
      labelTop,
      labelBottom,
      productivityHeights,
      width,
      onClick,
      clickable,
      blackWhite,
      tooltipContent,
    } = this.props;

    let classNames = 'bar';
    if (clickable) {
      classNames += ' bar--clickable';
    }

    let blackWhiteClassName = '';
    let LabelTop = () => <div className="bar__label-top" style={{ width }}> {labelTop} </div>;

    if (blackWhite) {
      blackWhiteClassName = 'black-white';
      LabelTop = () => <div style={{ width }}> {labelTop} </div>;
      LabelTop = withBlur(LabelTop);
    }


    return (
      <div
        className={classNames}
        onClick={onClick}
        data-multiline={true}
        data-tip={tooltipContent}
        data-for="bar__tooltip"
      >
        {tooltipContent.length !== 0 &&
          <ReactTooltip id="bar__tooltip" />
        }
        <LabelTop className="bar__label-top" />
        <div className="bar__items">
          <div style={{ flexGrow: 1 }} />
          <div
            style={{ width, height: productivityHeights.productive }}
            className={`bar__item--productive ${blackWhiteClassName}`} />
          <div
            style={{ width, height: productivityHeights.slightlyProductive }}
            className={`bar__item--slightlyProductive ${blackWhiteClassName}`} />
          <div
            style={{ width, height: productivityHeights.neutral }}
            className={`bar__item--neutral ${blackWhiteClassName}`} />
          <div
            style={{ width, height: productivityHeights.slightlyDistracting }}
            className={`bar__item--slightlyDistracting ${blackWhiteClassName}`} />
          <div
            style={{ width, height: productivityHeights.distracting }}
            className={`bar__item--distracting ${blackWhiteClassName}`} />
        </div>
        <span className="bar__label-bottom" style={{ width }}> {labelBottom} </span>
      </div>
    );
  }
}

Bar.propTypes = {
  labelTop: PropTypes.string.isRequired,
  labelBottom: PropTypes.string.isRequired,
  productivityHeights: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  blackWhite: PropTypes.bool,
  tooltipContent: PropTypes.string,
};

Bar.defaultProps = {
  onClick: () => {},
  clickable: false,
  blackWhite: false,
  tooltipContent: '',
};
