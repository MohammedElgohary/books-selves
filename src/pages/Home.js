import React from "react";
import { Shelf } from "../Components";

export const Home = ({ history, shelfs, changeBookShelf, books }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {books.length ? (
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf) => (
              <Shelf
                key={shelf.id}
                title={shelf.title}
                changeBookShelf={changeBookShelf}
                selfBooks={shelf.books}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">Loading Books ...</div>
      )}

      <div className="open-search">
        <button onClick={() => history.push("/search")}>Add a book</button>
      </div>
    </div>
  );
};
