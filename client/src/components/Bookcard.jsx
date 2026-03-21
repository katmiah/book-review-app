import Stars from "./Stars";

export default function Bookcard({ book, updateRating }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <img className="book-cover" src={book.img} alt="No image found" />

      <Stars
        rating={book.rating}
        onRate={(star) => updateRating(book.id, star)}
      />
    </div>
  );
}
