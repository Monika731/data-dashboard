import "./SummaryCards.css";

function SummaryCards({ books }) {
  const totalBooks = books.length;

  const subjectCounts = {};
  const authorCounts = {};

  books.forEach((book) => {
    // Count subjects
    if (book.subject) {
      book.subject.forEach((subj) => {
        subjectCounts[subj] = (subjectCounts[subj] || 0) + 1;
      });
    }

    // Count authors
    if (book.authors) {
      book.authors.forEach((author) => {
        const name = author.name;
        authorCounts[name] = (authorCounts[name] || 0) + 1;
      });
    }
  });

  const mostCommonSubject = Object.entries(subjectCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const topAuthor = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Books</h3>
        <p>{totalBooks}</p>
      </div>
      <div className="summary-card">
        <h3>Most Common Subject</h3>
        <p>{mostCommonSubject}</p>
      </div>
      <div className="summary-card">
        <h3>Top Author</h3>
        <p>{topAuthor}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
