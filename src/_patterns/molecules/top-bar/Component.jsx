import React from 'react';
import PropTypes from 'prop-types';

class TopBar extends React.Component {
  render() {
    const { title, shadow, TopBarNavigation, TopBarDropdown } = this.props;

    let classNames = 'topbar';
    if (shadow) {
      classNames += ' topbar--shadow';
    }

    return (
      <div className={classNames}>
        <div className="topbar__title">
          {title}
        </div>
        {TopBarNavigation && <div className="topbar__navigation">
          <TopBarNavigation />
        </div>}
        {TopBarDropdown && <div className="topbar__dropdown">
          <TopBarDropdown />
        </div>}
      </div>
    );
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  shadow: PropTypes.bool.isRequired,
  TopBarNavigation: PropTypes.func,
  TopBarDropdown: PropTypes.func,
};

TopBar.defaultProps = {
  TopBarNavigation: () => false,
  TopBarDropdown: () => false,
};

export default TopBar;
