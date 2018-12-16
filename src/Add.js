import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Add extends React.Component {
  state = {
    results: false,
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query, results: true });

    if (!query) {
      this.setState({ books: [], results: false });
      return;
    }

    BooksAPI.search(query).then(result => {
      if (result && !result.error) {
        const books = result.map(a => {
          a.shelf = this.selectShelf(a);
          return a;
        });
        this.setState({ books: books, results: true });
      } else {
        this.setState({ books: [], results: false });
      }
    });
  }

  selectShelf = (book) => {
    for (const a of this.props.newBook) {
      if (a.id === book.id) return a.shelf;
    }

    return 'none';
  }

  render() {
    const { query, books, results } = this.state;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              value={query}
              type='text'
              placeholder='Search by title or author'
              onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className='search-books-results'>
          {((query && results) || (!query && !results)) ? (
            <ol className='books-grid'>
              {books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelfMove={this.props.adding} />
                </li>
              ))}
            </ol>
          ) : (
            <div className='search-book-results-empty'>
              No books found
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Add;
