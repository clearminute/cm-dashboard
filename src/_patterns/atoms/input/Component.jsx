import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

import alertIcon from 'clearminute/styles/svg/alert.svg';


class Input extends React.Component {
  render() {
    const {
      className,
      type,
      name,
      onChange,
      value,
      placeholder,
      iconPath,
      warning,
      onFocus,
    } = this.props;

    const classNames = `input ${className}`;
    let classNameWarning = 'input__warning ';
    let classNameInput = 'input__input ';
    let classNameAlertIcon = 'input__alertIcon ';

    if (warning) {
      classNameWarning += 'input__warning--show';
      classNameInput += 'input__input--warning';
      classNameAlertIcon += 'input__alertIcon--show';
    }

    return (
      <div className={classNames}>
        <input
          className={classNameInput}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          name={name}
          type={type}
        />
        {iconPath && (
          <InlineSVG className="input__icon" src={iconPath} />
        )}
        <InlineSVG className={classNameAlertIcon} src={alertIcon} />
        <div className={classNameWarning}>
          {warning}
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  iconPath: PropTypes.string,
  placeholder: PropTypes.string,
  warning: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
};

export default Input;
