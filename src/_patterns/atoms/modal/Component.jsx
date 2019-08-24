// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

import closeIcon from 'clearminute/styles/svg/close-icon.svg';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
    this.preventClose = this.preventClose.bind(this);
  }

  handleCloseRequest() {
    if (this.props.onCloseRequest !== null) {
      this.props.onCloseRequest();
    }
  }

  preventClose(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const {
      open,
      title,
      small,
      fullBackgroundCover,
      onCloseRequest,
      children,
      showCloseIcon,
    } = this.props;

    const closeable = onCloseRequest !== null;
    const className = open ? 'modal--open' : '';
    const classNameModifier = fullBackgroundCover ? 'modal--opaque' : '';
    const classNameContainer = open ? 'modal__container--open' : '';
    const classNameSmallContainer = small ? 'modal__container--small' : '';

    return (
      <div className={`modal ${className} ${classNameModifier}`} onClick={this.handleCloseRequest}>
        <div
          className={`modal__container ${classNameContainer} ${classNameSmallContainer}`}
          onClick={this.preventClose}
        >
          <div className='modal__header'>
            <div className='modal__header__title'> {title} </div>
            {closeable && showCloseIcon && <div className='modal__header__close' onClick={this.handleCloseRequest}>
              <InlineSVG src={closeIcon} />
            </div>}
          </div>
          <div className='modal__content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onCloseRequest: PropTypes.func,
  small: PropTypes.bool,
  fullBackgroundCover: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: '',
  small: true,
  fullBackgroundCover: false,
  onCloseRequest: null,
  showCloseIcon: false,
};

export default Modal;
