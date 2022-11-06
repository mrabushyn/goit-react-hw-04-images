import  { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({value, imgText}) {
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')
  const [tags, setTags] = useState('')

  const toggleModal = evt => {
    const targetId = Number(evt.target.id);
    const imgObj = value.find(image => image.id === targetId);
    setShowModal( true );
    setLargeImageURL(imgObj.largeImageURL);
    setTags(imgObj.tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

    return (
      <>
        {showModal && (
          <Modal value={{largeImageURL, tags}} onClose={onCloseModal} />
        )}
        {value.map(({ id, webformatURL }) => (
          <li key={id} className={css.galleryItem}>
            <img
              className={css.imageGalleryItem}
              src={webformatURL}
              alt={imgText}
              onClick={toggleModal}
              id={id}
            />
          </li>
        ))}
      </>
    );
  }
