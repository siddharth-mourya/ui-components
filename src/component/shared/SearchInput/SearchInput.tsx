import React from "react";
import styles from "./SearchInput.module.scss";
interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onFocus?: () => void;
}
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  onFocus,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const handleSearch = () => {
    onSearch(inputValue);
  };
  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchIcon}>
        <span role="img" aria-label="search">
          🔍
        </span>
      </div>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={inputValue}
        // onFocus={onFocus}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
export default SearchInput;
