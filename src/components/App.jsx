import React, { Component } from 'react';
import axios from 'axios';
import './styles.module.css';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Button } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30026905-3ea175f3d607ccbd72fb69757';

export class App extends Component {
  state = {
    searchText: '',
    page: 1,
    images: null,
    loading: false,
    perPage: 12,
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { page, searchText, perPage } = this.state;

      if (prevState.searchText !== searchText) {
        this.setState({ loading: true });
        const response = await axios.get(
          `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        const images = response.data.hits;

        if (images.length === 0) {
          this.setState({ loading: false, images: null });
          Notify.failure('Нічого не знайдено. Спробуйте ввести щось інше)))');
        }

        else {
          this.setState({ images, loading: false });
        }
      }

      if (prevState.page < page) {
        this.setState({ loading: true });
        const response = await axios.get(
          `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const resImg = response.data.hits;
        let images = [...this.state.images, ...resImg];

        this.setState({ images, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      Notify.failure('Ups... Щось пішло не так');
    }
  }

  handleSearchSubmit = searchText => {
    this.setState({ searchText, page: 1 });
  };

  buttonLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    let { loading, images, searchText, perPage } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {loading && <Loader />}
        {images && (
          <ImageGallery>
            <ImageGalleryItem value={images} imgText={searchText} />
          </ImageGallery>
        )}
        {images && images.length >= perPage && (
          <Button onButton={this.buttonLoadMore} />
        )}
      </div>
    );
  }
}
