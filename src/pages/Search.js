import React, { Component } from "react";
import { BooksGrid } from "../Components";
import ProtoTypes from "prop-types";

export class Search extends Component {
  render() {
    const {
      history,
      searchBooks,
      changeBookShelf,
      books,
      query,
      searching,
      t,
    } = this.props;
    const handlePagination = () => history.push("/");

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={handlePagination}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder={t("Search by title or author")}
              value={query}
              onChange={(event) => searchBooks(event.target.value)}
              dir={"auto"}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!searching ? (
            <BooksGrid {...{ books, changeBookShelf, t }} />
          ) : (
            <div className="loading">{t("Searching ...")}</div>
          )}
        </div>
      </div>
    );
  }
}

BooksGrid.propTypes = {
  books: ProtoTypes.array.isRequired,
  history: ProtoTypes.object,
  changeBookShelf: ProtoTypes.func.isRequired,
  searchBooks: ProtoTypes.func,
  t: ProtoTypes.func.isRequired,
  query: ProtoTypes.string,
  searching: ProtoTypes.bool,
};
