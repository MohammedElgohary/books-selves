import React from "react";

export const Book = ({ book, changeBookShelf, noDefaultValue }) => {
  noDefaultValue = noDefaultValue || false;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 174,
            backgroundImage: `url(${
              book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : ""
            })`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={noDefaultValue ? "" : book.shelf}
            onChange={(e) => {
              changeBookShelf(book, e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? (
          book.authors.map((author, index) => (
            <span key={book.title + author + index}>{author}</span>
          ))
        ) : (
          <span>No author</span>
        )}
      </div>
    </div>
  );
};
