import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  toggleModal = evt => {
    const targetId = Number(evt.target.id);
    const imgObj = this.props.value.find(image => image.id === targetId);
    const { largeImageURL, tags } = imgObj;
    this.setState(state => ({ showModal: true }));
    this.setState({ largeImageURL, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { value, imgText } = this.props;
    const { showModal } = this.state;

    return (
      <>
        {showModal && <Modal value={this.state} onClose={this.onCloseModal} />}
        {value.map(({ id, webformatURL }) => (
          <li key={id} className={css.galleryItem}>
            <img
              className={css.imageGalleryItem}
              src={webformatURL}
              alt={imgText}
              onClick={this.toggleModal}
              id={id}
            />
          </li>
        ))}
      </>
    );
  }
}
