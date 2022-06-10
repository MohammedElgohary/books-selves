import React from "react";
import propTypes from "prop-types";
import { Book } from "../Components";

export const Shelf = ({ title, selfBooks, changeBookShelf, t }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{t(title)}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {selfBooks.map((book) => (
            <li key={book.title + book.id}>
              <Book book={book} changeBookShelf={changeBookShelf} t={t} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: propTypes.string.isRequired,
  selfBooks: propTypes.array.isRequired,
  changeBookShelf: propTypes.func.isRequired,
  t: propTypes.func.isRequired,
};
