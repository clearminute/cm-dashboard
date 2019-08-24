// Externals (A-z)
import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import InlineSVG from 'react-inlinesvg';

import logo from 'clearminute/styles/svg/logo.svg';
import applicationsIcon from 'clearminute/styles/svg/applications-icon.svg';
import dashboardIcon from 'clearminute/styles/svg/dashboard-icon.svg';

const menuItems = [
  {
    link: '/',
    handleClick: router => router.push('/'),
    primaryText: 'Dashboard',
    icon: dashboardIcon,
    className: '',
  },
  {
    link: '/activities',
    handleClick: router => router.push('/activities'),
    primaryText: 'Activities',
    icon: applicationsIcon,
    className: 'navigation__item--activities',
  },
];

class Navigation extends React.Component {
  render() {
    const { pathname, router } = this.props; // eslint-disable-line react/prop-types

    return (
      <div className="navigation">
        <div className="navigation__logo">
          <InlineSVG src={logo} />
        </div>
        {map(
          menuItems,
          (menuItem, index) => {
            const selected = menuItem.link === pathname;
            let className = selected
              ? 'navigation__item navigation__item--selected '
              : 'navigation__item ';
            className += menuItem.className;
            const iconClassName = selected
              ? 'navigation__item__icon navigation__item__icon--selected'
              : 'navigation__item__icon';

            return (
              <div
                key={index}
                className={className}
                onClick={() => menuItem.handleClick.call(this, router)}
                role="button"
              >
                <InlineSVG src={menuItem.icon} className={iconClassName} />
                <div className="navigation__item__title"> {menuItem.primaryText} </div>
              </div>
            );
          },
          this,
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default withRouter(Navigation);
