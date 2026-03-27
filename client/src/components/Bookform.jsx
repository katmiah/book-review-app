import { useState } from "react";
import Stars from "./Stars";

export default function Bookform({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    addBook({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      rating,
    });

    setTitle("");
    setAuthor("");
    (setDescription(""), setRating(0));
  }

  return (
    <div className="book-form">
      <h4>Add a New Book</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="stars-container">
          <Stars rating={rating} onRate={setRating} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
