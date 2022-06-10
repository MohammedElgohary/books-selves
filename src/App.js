import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search, Home } from "./pages";
import { Route, Switch, withRouter } from "react-router-dom";

import { translation } from "./lang";

// shelves types
const Shelf = Object.freeze({
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read",
  none: "none",
});

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    shelves: [
      {
        id: Shelf.currentlyReading,
        title: "Currently Reading",
        books: [],
      },
      {
        id: Shelf.wantToRead,
        title: "Want to Read",
        books: [],
      },
      {
        id: Shelf.read,
        title: "Read",
        books: [],
      },
    ],
    query: "",
    searching: false,
    translation: translation.en.translation,
    lang: "en",
    dir: translation.en.dir,
  };

  // properties
  searchTimer = null;

  // methods
  componentDidMount() {
    this.getData();

    if (window) {
      let lang = window.localStorage.getItem("lang");
      if (lang) {
        this.initializeLang(lang);
      }
    }
    // set language
  }

  // recreate shelves
  reCreateShelves = (books) => {
    const shelves = [
      {
        id: Shelf.currentlyReading,
        title: "Currently Reading",
        books: [],
      },
      {
        id: Shelf.wantToRead,
        title: "Want to Read",
        books: [],
      },
      {
        id: Shelf.read,
        title: "Read",
        books: [],
      },
    ];
    books.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        shelves[0].books.push(book);
      } else if (book.shelf === "wantToRead") {
        shelves[1].books.push(book);
      } else if (book.shelf === "read") {
        shelves[2].books.push(book);
      }
    });

    return shelves;
  };

  // gets books and re factors the shelves
  getData = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        shelves: this.reCreateShelves(books),
      });
    });
  };

  // arrange books by shelf
  arrangeBooks = (books) => {
    const { shelves } = this.state;

    books.forEach((book) => {
      shelves.forEach((shelf) => {
        if (book.shelf === shelf.id) {
          shelf.books.push(book);
        }
      });
    });

    this.setState({ shelves, books });
    return shelves;
  };

  // assign a book to a shelf
  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      const { books, shelves, searchResults } = this.state;

      books.forEach((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
      });

      shelves.forEach((s) => {
        // add book to shelf
        if (s.id === book.shelf) {
          s.books.push(book);
        }

        s.books.forEach((b) => {
          // remove book from its old shelf
          if (b.id === book.id && s.id !== b.shelf) {
            s.books = s.books.filter((b) => b.id !== book.id);
          }

          if (b.id === book.id) {
            b.shelf = shelf;
          }
        });
      });

      searchResults.forEach((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
      });

      this.setState({ books, shelves, searchResults });
    });
  };

  // searching after 0.5 second from last typing
  searchBooks = async (query) => {
    await this.setState({ query });

    if (this.searchTimer) clearTimeout(this.searchTimer);

    this.searchTimer = setTimeout(async () => {
      await this.setState({ searching: true });
      BooksAPI.search(query).then((books) => {
        if (books && books.length) {
          this.setState({
            searchResults: this.getBooksSelfs(books),
            searching: false,
          });
        } else {
          this.setState({ searchResults: [], searching: false });
        }
      });
    }, 500);
  };

  initializeLang = (lang) => {
    this.setState({
      translation: translation[lang].translation,
      lang,
      dir: translation[lang].dir,
    });
    window.localStorage.setItem("lang", lang);
  };

  getBooksSelfs = (books) => {
    const OurBooks = this.state.books;

    let resultBooks = [];

    books.forEach((book) => {
      OurBooks.forEach((OurBook) => {
        if (OurBook.id === book.id) {
          book.shelf = OurBook.shelf;
        }
      });
      resultBooks.push(book);
    });

    return resultBooks;
  };

  render() {
    let { shelves, books, query, searching, searchResults, dir, lang } =
        this.state,
      { changeBookShelf, searchBooks, initializeLang } = this;

    const t = (key) =>
      this.state.translation[key] ? this.state.translation[key] : key;
    return (
      <div className="app" dir={dir}>
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <Home
                {...{
                  history,
                  shelves,
                  changeBookShelf,
                  books,
                  t,
                  translation,
                  initializeLang,
                  lang,
                }}
              />
            )}
          />

          <Route
            path="/search"
            render={({ history }) => (
              <Search
                {...{
                  history,
                  searchBooks,
                  changeBookShelf,
                  books: searchResults,
                  query,
                  searching,
                  t,
                  shelves,
                }}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(BooksApp);
