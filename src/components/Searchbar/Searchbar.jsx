import { useState  } from 'react';
import css from './Searchbar.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BsSearch } from 'react-icons/bs';

export default function SearchBar({onSubmit}) {
  const [searchText, setSearchText] = useState('')

  const handleChange = evt => {
    setSearchText (evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchText.trim() === '') {
      Notify.warning('Введіть текст для пошуку');
      return;
    }
    onSubmit(searchText);
    setSearchText ('');
    evt.target.elements.text.value = '';
  };


    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <BsSearch />
            <span className={css.buttonLabel}></span>
          </button>

          <input
            className={css.input}
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
        />
        </form>
      </header>
    );
  }




// export class SearchBar extends Component {
//   state = {
//     searchText: '',
//   };

//   handleChange = evt => {
//     this.setState({ searchText: evt.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     if (this.state.searchText.trim() === '') {
//       Notify.warning('Введіть текст для пошуку');
//       return;
//     }
//     this.props.onSubmit(this.state.searchText);
//     this.setState({ searchText: '' });
//     // let searchText = evt.target.elements.text.value;
//     // searchText ? this.setState({ searchText }) : alert('ENTER TEXT');
//     evt.target.elements.text.value = '';
//   };

//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form className={css.form} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.button}>
//             <BsSearch />
//             <span className={css.buttonLabel}></span>
//           </button>

//           <input
//             className={css.input}
//             type="text"
//             name="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
