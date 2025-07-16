import { useSearchParams } from 'react-router';
import { SearchIcon } from '../../icons/SearchIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import './SearchInput.scss';

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const newParams = new URLSearchParams(searchParams.toString());

    if (newValue.trim() === '') {
      newParams.delete('search');
    } else {
      newParams.set('search', newValue);
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('search');
    newParams.delete('page');
    setSearchParams(newParams);
  };

  return (
    <div className="search-input">
      <SearchIcon />
      <input
        type="text"
        className="search-input__field"
        value={query}
        onChange={handleChange}
        aria-label="Search"
      />
      {query && (
        <button
          className="search-input__clear"
          onClick={handleClear}
          aria-label="Clear"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
