import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search, Home } from "./pages";
import { Route, Switch, withRouter } from "react-router-dom";

// shelfs types
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
    shelfs: [
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
  };

  // properties
  searchTimer = null;

  // methods
  componentDidMount() {
    this.getData();
  }

  // recreate shelfs
  recreateShelfs = (books) => {
    const shelfs = [
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
        shelfs[0].books.push(book);
      } else if (book.shelf === "wantToRead") {
        shelfs[1].books.push(book);
      } else if (book.shelf === "read") {
        shelfs[2].books.push(book);
      }
    });

    return shelfs;
  };

  // gets books and re factors the shelfs
  getData = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books: books,
        shelfs: this.recreateShelfs(books),
      });
    });
  };

  // arrange books by shelf
  arrangeBooks = (books) => {
    const { shelfs } = this.state;

    books.forEach((book) => {
      shelfs.forEach((shelf) => {
        if (book.shelf === shelf.id) {
          shelf.books.push(book);
        }
      });
    });

    this.setState({ shelfs, books });
    return shelfs;
  };

  // assign a book to a shelf
  changeBookShelf = (target) => (book, shelf) => {
    const { books, shelfs } = this.state;

    books.forEach((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
    });

    shelfs.forEach((s) => {
      s.books.forEach((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
      });
    });

    this.setState({ books, shelfs });

    BooksAPI.update(book, shelf).then((res) => {
      if (target === "search") {
        this.searchBooks(this.state.query);
        this.getData();
      } else {
        this.getData();
      }
    });
  };

  // searching after 1 second from last typing
  searchBooks = async (query) => {
    await this.setState({ query });

    if (this.searchTimer) clearTimeout(this.searchTimer);

    this.searchTimer = setTimeout(async () => {
      await this.setState({ searching: true });
      BooksAPI.search(query).then((books) => {
        if (books && books.length) {
          this.setState({ searchResults: books, searching: false });
        } else {
          this.setState({ searchResults: [], searching: false });
        }
      });
    }, 1000);
  };

  render() {
    let { shelfs, books, query, searching, searchResults } = this.state,
      { changeBookShelf, searchBooks } = this;

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <Home
                {...{
                  history,
                  shelfs,
                  changeBookShelf: changeBookShelf("getData"),
                  books,
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
                  changeBookShelf: changeBookShelf("search"),
                  books: searchResults,
                  query,
                  searching,
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
