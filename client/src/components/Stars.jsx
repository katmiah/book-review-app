export default function Stars({ rating, onRate }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star active" : "star"}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
