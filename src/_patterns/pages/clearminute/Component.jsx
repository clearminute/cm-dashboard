import React from 'react';
import PropTypes from 'prop-types';

import NavigationContainer from 'clearminute/_patterns/molecules/navigation/Container';
import SupportButton from 'clearminute/_patterns/atoms/support-button/Component';

class ClearMinute extends React.Component {
  render() {
    const { children, location } = this.props;

    return (
      <div className="app">
        <NavigationContainer pathname={location.pathname} />
        <div className="app__body">{children}</div>
        <SupportButton className="app__support-button" />
      </div>
    );
  }
}

ClearMinute.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClearMinute;
