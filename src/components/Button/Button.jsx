import React, { Component } from 'react';
import css from './Button.module.css';

export class Button extends Component {

  loadMoreBtn = () => {
    this.props.onButton();
  };

  render() {
    return (
      
        <button className={css.button} onClick={this.loadMoreBtn}>
          Показати ще
        </button>
      
    );
  }
}
