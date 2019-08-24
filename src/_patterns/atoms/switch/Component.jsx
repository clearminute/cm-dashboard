// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';

class Switch extends React.Component {
  render() {
    const {
      active,
      onToggleSwitch,
      enabled,
    } = this.props;

    const className = active ? 'switch--active' : '';
    const classNameCircle = active ? 'switch__circle--active' : '';

    return (
      <div onClick={enabled ? onToggleSwitch : null} className={`switch ${className} ${this.props.className}`}>
        <div className={`switch__circle ${classNameCircle}`} />
      </div>
    );
  }
}

Switch.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggleSwitch: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  className: '',
  enabled: true,
};

export default Switch;
