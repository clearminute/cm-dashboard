// Externals (A-z)
import React from 'react';
import PropTypes from 'prop-types';
import { map, find } from 'lodash';


class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  render() {
    const { open } = this.state;
    const { items, activeItemId, setActiveItemId } = this.props;

    let className = 'dropdown ';
    let classNameOption = 'dropdown__option ';

    if (open) {
      className += ' dropdown--open';
      classNameOption += ' dropdown__option--open';
    }

    const activeItem = find(items, item => item.id === activeItemId);

    return (
      <div
        onClick={() => this.setState(prevState => ({ open: !prevState.open }))}
        className={className}
        value={activeItemId}
        onChange={e => setActiveItemId(e.target.value)}
      >
        <div
          className={classNameOption}
          key={activeItem.id}
          value={activeItem.id}
        >
          {activeItem.title}
        </div>
        {map(items, item =>
          <div
            className={`${classNameOption} ${item.id === activeItemId ? 'dropdown__option--active' : ''}`}
            key={item.id}
            value={item.id}
            onClick={() => setActiveItemId(item.id)}
          >
            {item.title}
          </div>,
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  activeItemId: PropTypes.string.isRequired,
  setActiveItemId: PropTypes.func.isRequired,
};


export default Dropdown;
