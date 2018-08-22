import React, { Component } from 'react';
import './interaction.css';

export default class InteractionMenu extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { hide: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hideInteractionMenu();
    }
    return true;
  }

  selectedItem(item) {
    this.props.selectedItem(item);
    this.props.hideInteractionMenu();
  }

  render() {
    if (this.state.hide) return null;
    const { left, top } = this.props.coordinate;

    return (
      <ul
        className="interaction-menu"
        ref={this.setWrapperRef}
        style={{ left: left - 15, top: top - 10 }}
      >
        <li
          className="item"
          onClick={() => this.selectedItem('interaction-input')}
        >
          {' '}
          <i class="fa fa-sitemap" aria-hidden="true" />{' '}
          <span>Interaction</span>
        </li>
        <li
          className="item"
          onClick={() => this.selectedItem('interaction-ddl')}
        >
          {' '}
          <i class="fa fa-clone" aria-hidden="true" /> <span>Duplicate</span>
        </li>
        <li
          className="item"
          onClick={() => this.selectedItem('interaction-ddl')}
        >
          {' '}
          <i class="fa fa-link" aria-hidden="true" /> <span>Reference</span>
        </li>
        <li className="item" onClick={() => this.selectedItem('')}>
          {' '}
          <i class="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          <span>Context Fallback</span>
        </li>
      </ul>
    );
  }
}
