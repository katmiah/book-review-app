import { useState, useEffect } from "react";
import "./App.css";
import Bookcard from "./components/Bookcard";
import Navbar from "./components/Navbar";
import Bookform from "./components/Bookform";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:3001/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function addBook(newBook) {
    try {
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const createdBook = await response.json();

      setBooks((currentBooks) => [...currentBooks, createdBook]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  async function updateRating(id, newRating) {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}/rating`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });

      const updatedBook = await response.json();

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book,
        ),
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
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
