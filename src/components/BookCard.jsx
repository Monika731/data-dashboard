import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";

const BookCard = ({ id, title, authors, publishYear, subjects, coverId, searchTerm }) => {
  const highlightedTitle = title.replace(
    new RegExp(`(${searchTerm})`, "gi"),
    (match) => `<mark>${match}</mark>`
  );

  const workId = id.split("/").pop(); // Extracts "OL18417W"

  return (
    <tr>
      <td>
        {coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
            alt={title}
            style={{ width: "50px" }}
          />
        ) : (
          "N/A"
        )}
      </td>
      <td>
        <Link to={`/book/works/${workId}`} dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
      </td>
      <td>{authors.join(", ")}</td>
      <td>{publishYear}</td>
      <td>
        {subjects && subjects.length > 0
          ? subjects.slice(0, 3).join(", ") + (subjects.length > 3 ? "..." : "")
          : "N/A"}
      </td>
    </tr>
  );
};

export default BookCard;
