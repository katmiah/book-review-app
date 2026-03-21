import { useState } from "react";
import Stars from "./Stars";

export default function Bookform({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    addBook({
      title: title.trim(),
      author: author.trim(),
    });

    setTitle("");
    setAuthor("");
    setRating(0);
  }

  return (
    <div>
      <h4>Add a New Book</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Author
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
        <Stars rating={rating} onRate={setRating} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
