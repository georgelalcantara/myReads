import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Shelf from './Shelf';
import Add from './Add';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
    state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  shelfMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.map(a => {
        if (a.id === book.id) {
          a.shelf = shelf;
        };

        return a;
      });

      if (books.filter(a => a.id === book.id).length === 0) {
        book.shelf = shelf;
        books.push(book);
      }

      this.setState({ books });
    });
  }

  renderBooks = () => {
    const SHELVES = [
      ['Currently Reading', 'currentlyReading'],
      ['Want to Read', 'wantToRead'],
      ['Read', 'read']
    ]

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {SHELVES.map((shelf, index) => (
            <Shelf
              key={index}
              shelfMove={this.shelfMove}
              shelfCont={shelf[0]}
              books={this.state.books.filter(a => a.shelf === shelf[1])} />
          ))}
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      );
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path='/' render={this.renderBooks}/>
        <Route path='/search' render={({ history }) => (
          <Add
            newBook={this.state.books}
            adding={(book, shelf) => {
              this.shelfMove(book, shelf);
              history.push('/');
            }}
          />
        )}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
