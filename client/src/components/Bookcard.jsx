import Stars from "./Stars";

export default function Bookcard({ book, updateRating }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>"{book.description}"</p>

      <Stars
        rating={book.rating}
        onRate={(star) => updateRating(book.id, star)}
      />
    </div>
  );
}
