import * as React from 'react';

const svg = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    className="blur-svg"
  >
    <defs>
      <filter id="blur-filter">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
  </svg>
);

export default function withBlur(WrappedComponent) {
  return function WrappedComponentWithBlur(props) {
    const className = props.className || ''; // eslint-disable-line react/prop-types
    return (
      <div className={`with-blur__blur ${className}`}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
