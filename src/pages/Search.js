import React from "react";
import { BooksGrid } from "../Components";

export const Search = ({
  history,
  searchBooks,
  changeBookShelf,
  books,
  query,
  searching,
}) => {
  const handlePagination = () => history.push("/");

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => handlePagination()}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => searchBooks(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {!searching ? (
          <BooksGrid books={books} changeBookShelf={changeBookShelf} />
        ) : (
          <div className="loading">Searching ...</div>
        )}
      </div>
    </div>
  );
};
