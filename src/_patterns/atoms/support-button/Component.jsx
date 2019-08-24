import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

import chatIcon from 'clearminute/styles/svg/chat-icon.svg';

export default class SupportButton extends React.Component {
  render() {
    const {
      className,
    } = this.props;

    const classNames = `support-button ${className}`;

    return (
      <button
        className={classNames}
        onClick={() => { window.location.href = 'mailto:support@clearminute.com'; }}
        type="button"
      >
        <div className="support-button_title">
          Contact Support
        </div>
        <div className="support-button__icon">
          <InlineSVG src={chatIcon} />
        </div>
      </button>
    );
  }
}

SupportButton.propTypes = {
  className: PropTypes.string,
};

SupportButton.defaultProps = {
  className: '',
};
