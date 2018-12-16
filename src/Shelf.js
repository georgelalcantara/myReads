import React from 'react';
import Book from './Book';

class Shelf extends React.Component {
  render() {
    const { shelfCont, books, shelfMove } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfCont}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfMove={shelfMove} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
