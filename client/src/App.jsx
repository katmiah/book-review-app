import { useState } from "react";
import "./App.css";
import Bookcard from "./components/Bookcard";
import Navbar from "./components/Navbar";
import Bookform from "./components/Bookform";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      img: "images/northanger-abbey.webp",
      title: "Northanger Abbey",
      author: "Jane Austen",
      rating: 4,
    },
    {
      id: 2,
      img: "images/the-hobbit.jpg",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      rating: 3,
    },
    {
      id: 3,
      img: "images/lolita.jpg",
      title: "Lolita",
      author: "Vladimir Nabokov",
      rating: 5,
    },
  ]);

  function updateRating(id, newRating) {
    setBooks((currenBooks) =>
      currenBooks.map((book) =>
        book.id === id ? { ...book, rating: newRating } : book,
      ),
    );
  }

  function addBook(newBook) {
    setBooks((currentBooks) => [
      ...currentBooks,
      {
        id: crypto.randomUUID(),
        title: newBook.title,
        author: newBook.author,
        rating: 0,
      },
    ]);
  }

  return (
    <div>
      <Navbar />

      <div className="book-list">
        {books.map((book) => (
          <Bookcard key={book.id} book={book} updateRating={updateRating} />
        ))}
      </div>

      <Bookform addBook={addBook} />
    </div>
  );
}

export default App;
