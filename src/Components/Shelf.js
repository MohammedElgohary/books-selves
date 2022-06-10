import React from "react";
import { Book } from "../Components";

export const Shelf = ({ title, selfBooks, changeBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {selfBooks.map((book) => (
            <li key={book.title + book.id}>
              <Book book={book} changeBookShelf={changeBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
