import s from './CategoryBar.module.css';

const CATEGORIES = [
  'General', 'Technology', 'Sports', 'Business',
  'Entertainment', 'Health', 'Science', 'Politics',
];

function CategoryBar({ selected, onSelect }) {
  return (
    <div className={s.bar}>
      <span className={s.label}>Category:</span>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`${s.chip} ${selected === cat ? s.active : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
