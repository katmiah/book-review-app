import { useEffect, useRef } from "react";
import Stars from "./Stars";
import { useState } from "react";

export default function Bookcard({ book, updateRating, deleteBook }) {
  const [confirming, setConfirming] = useState(false);
  const deleteButtonRef = useRef(null);

  function handleDelete(e) {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      return;
    }
    deleteBook(book.id);
  }

  useEffect(() => {
    if (!confirming) return;
    const timeoutId = setTimeout(() => setConfirming(false), 3000);

    function handleClickOutside(e) {
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(e.target)
      ) {
        setConfirming(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [confirming]);

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p className="description">"{book.description}"</p>

      <Stars
        rating={book.rating}
        onRate={(star) => updateRating(book.id, star)}
      />
      <button
        ref={deleteButtonRef}
        className={`deleteButton ${confirming ? "confirming" : ""}`}
        onClick={handleDelete}
      >
        <span>{confirming ? "Confirm Delete?" : ""}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
