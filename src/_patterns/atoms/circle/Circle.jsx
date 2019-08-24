// Externals - Others
import React from 'react';
import PropTypes from 'prop-types';


// TODO: Refactor this component, best get rid of it, it's an overengineered mess
class Circle extends React.Component {
  render() {
    const {
      backgroundColor,
      size,
      label,
      style,
      className,
    } = this.props;

    const width = `${size}px`;
    const height = `${size}px`;
    const fontSize = size;

    return (
      <div className={`circle ${className}`} style={style}>
        <div className="circle__icon" style={{ backgroundColor, width, height }}/>
        <p className="circle__label" style={{ fontSize }}> {label} </p>
      </div>
    );
  }
}

Circle.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.object, // eslint-disable-line
  className: PropTypes.string,
};

Circle.defaultProps = {
  style: {},
  className: '',
};

export default Circle;
