import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetail.css";

const BookDetail = () => {
  const { '*': id } = useParams(); // Extracts book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/${id}.json`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book detail:", error);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div className="book-detail">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      <h2>{book.title}</h2>

      {book.description && (
        <p className="description">
          {typeof book.description === "string"
            ? book.description
            : book.description.value}
        </p>
      )}

      {book.covers?.[0] && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={book.title}
          className="cover-image"
        />
      )}
    </div>
  );
};

export default BookDetail;
