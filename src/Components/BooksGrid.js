import React from "react";
import { Book } from "../Components";

export const BooksGrid = ({ books, changeBookShelf }) => {
  return (
    <ol className="books-grid">
      {books.length ? (
        books.map((book) => (
          <li key={book.title + book.id}>
            <Book
              book={book}
              changeBookShelf={changeBookShelf}
              noDefaultValue={true}
            />
          </li>
        ))
      ) : (
        <div className="loading">No Search Results</div>
      )}
    </ol>
  );
};
