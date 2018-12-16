import React from 'react';

class Book extends React.Component {
  handleChange = (value) => {
    const { shelfMove, book } = this.props;
    shelfMove(book, value);
  }

  render() {
    const { book } = this.props;
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumbnail + ')' }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={event => this.handleChange(event.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
