import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";

export class BookDetails extends Component {
  state = {
    book: {},
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({ book: this.props.history.location.state });
    } else {
      this.getBook(this.props.match.params.id);
    }
  }

  getBook = (bookId) => {
    BooksAPI.get(bookId).then((book) => {
      this.setState({ book });
    });
  };

  render() {
    const { book } = this.state;
    const { history, t } = this.props;
    const handlePagination = () => history.push("/");

    return (
      <div>
        <button className="close-search" onClick={handlePagination}>
          Close
        </button>

        {Object.keys(book).length ? (
          <>
            <div
              className="book-cover"
              style={{
                width: 256,
                height: 348,
                backgroundImage: `url(${
                  book.imageLinks && book.imageLinks.thumbnail
                    ? book.imageLinks.thumbnail
                    : ""
                })`,
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <h1>{book.title}</h1>
              <h2>{book.subtitle}</h2>
            </div>

            <div>
              {t("authors")}:
              <h3 className="book-authors">
                {book.authors ? (
                  book.authors.map((author, index) => (
                    <span key={book.title + author + index}>{author}</span>
                  ))
                ) : (
                  <span>{t("No author")}</span>
                )}
              </h3>
            </div>
          </>
        ) : book ? (
          <div className="loading">{t("Loading Book ...")}</div>
        ) : (
          <div className="loading">{t("Book was not found !")}</div>
        )}
      </div>
    );
  }
}

BookDetails.propTypes = {
  history: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
