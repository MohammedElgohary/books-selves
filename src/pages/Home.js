import React from "react";
import propTypes from "prop-types";
import { Shelf } from "../Components";

export const Home = ({
  history,
  shelves,
  changeBookShelf,
  books,
  t,
  translation,
  initializeLang,
  lang,
}) => {
  const LangOptions = () =>
    Object.keys(translation).map((key) => (
      <option key={translation[key].name} value={key}>
        {translation[key].name}
      </option>
    ));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{t("MyReads")}</h1>
      </div>
      <div>
        <select
          onChange={(e) => {
            initializeLang(e.target.value);
            console.log(e.target.value);
          }}
          value={lang}
          className="language-selector"
        >
          <LangOptions />
        </select>
      </div>
      {books.length ? (
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <Shelf
                key={shelf.id}
                title={shelf.title}
                changeBookShelf={changeBookShelf}
                selfBooks={shelf.books}
                t={t}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">{t("Loading Books ...")}</div>
      )}

      <div className="open-search">
        <button onClick={() => history.push("/search")}>
          {t("Add a book")}
        </button>
      </div>

      <div className="footer">
        &copy; Mohammed Samara El Gohary {new Date().getFullYear()}
      </div>
    </div>
  );
};

Home.propTypes = {
  shelves: propTypes.array.isRequired,
  books: propTypes.array.isRequired,
  changeBookShelf: propTypes.func.isRequired,
  t: propTypes.func.isRequired,
  translation: propTypes.object.isRequired,
  initializeLang: propTypes.func.isRequired,
  lang: propTypes.string.isRequired,
};
