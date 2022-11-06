import css from './Button.module.css';

export default function Button({ onButton }) {
  const loadMoreBtn = () => {
    onButton();
  };

  return (
    <button className={css.button} onClick={loadMoreBtn}>
      Показати ще
    </button>
  );
}
