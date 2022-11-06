import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.module.css';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Button from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30026905-3ea175f3d607ccbd72fb69757';
const perPage = 12;

export function App() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fatchData() {
      try {
        if (searchText !== '') {
          setLoading(true);
          const response = await axios.get(
            `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
          );
          const imagesArr = response.data.hits;

          if (imagesArr.length === 0) {
            setLoading(false);
            setImages(null);
            Notify.failure('Нічого не знайдено. Спробуйте ввести щось інше)))');
          } else {
            setLoading(false);
            setImages(imagesArr);
          }

          if (page === 1) {
            setLoading(true);
            const response = await axios.get(
              `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
            );
            const resImg = response.data.hits;
            setLoading(false);
            setImages(resImg);
          }

          if (page >= 2) {
            setLoading(true);
            const response = await axios.get(
              `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
            );
            const resImg = response.data.hits;
            let imagesArr = [...images, ...resImg];
            setLoading(false);
            setImages(imagesArr);
          }
        }
      } catch (error) {
        setLoading(false);
        Notify.failure('Ups... Щось пішло не так');
      }
    }

    fatchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText]);

  const handleSearchSubmit = searchText => {
    setSearchText(searchText);
    setPage(1);
  };

  const buttonLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {images && (
        <ImageGallery>
          <ImageGalleryItem value={images} imgText={searchText} />
        </ImageGallery>
      )}
      {images && images.length >= perPage && (
        <Button onButton={buttonLoadMore} />
      )}
    </div>
  );
}
