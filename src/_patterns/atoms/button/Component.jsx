import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const {
      label,
      type,
      disabled,
      inverted,
      negative,
      className,
      onClick,
    } = this.props;

    let classNames = `clearminute-ui__button ${className}`;
    if (inverted) {
      classNames += ' clearminute-ui__button--inverted-grey';
    }
    if (negative) {
      classNames += ' clearminute-ui__button--negative';
    }

    return (
      <button
        className={classNames}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  negative: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  inverted: false,
  negative: false,
  type: 'button',
};
