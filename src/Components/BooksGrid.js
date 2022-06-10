import React from "react";
import propTypes from "prop-types";
import { Book } from "../Components";

export const BooksGrid = ({ books, changeBookShelf, t }) => {
  return (
    <ol className="books-grid">
      {books.length ? (
        books.map((book) => (
          <li key={book.title + book.id}>
            <Book book={book} changeBookShelf={changeBookShelf} t={t} />
          </li>
        ))
      ) : (
        <div className="loading">{t("No Search Results")}</div>
      )}
    </ol>
  );
};

BooksGrid.propTypes = {
  books: propTypes.array.isRequired,
  changeBookShelf: propTypes.func.isRequired,
  t: propTypes.func.isRequired,
};
