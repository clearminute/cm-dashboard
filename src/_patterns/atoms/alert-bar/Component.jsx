import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

import closeIcon from 'clearminute/styles/svg/close-icon.svg';


export default class AlertBar extends React.Component {
  render() {
    const {
      visible,
      text,
      type,
      onCloseRequest,
    } = this.props;

    let classNames = `alert-bar alert-bar--${type}`;
    if (visible) {
      classNames += ' alert-bar--visible';
    }

    return (
      <div className={classNames}>
        <div className='alert-bar__close' onClick={onCloseRequest}>
          <InlineSVG src={closeIcon} />
        </div>
        {text}
      </div>
    );
  }
}

AlertBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onCloseRequest: PropTypes.func.isRequired,
};
