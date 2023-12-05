import "@/app/globals.css";
import React, { useState } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => onSearch(query);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
