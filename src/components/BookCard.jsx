function BookCard({ title, authors, publishYear, subjects, coverId }) {
    const coverImage = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://via.placeholder.com/100x150?text=No+Image";
  
    return (
      <tr>
        <td>
          <img src={coverImage} alt={`Cover for ${title}`} className="cover-image" />
        </td>
        <td>{title}</td>
        <td>{authors.join(', ')}</td>
        <td>{publishYear}</td>
        <td>{subjects?.slice(0, 3).join(', ') || 'N/A'}</td>
      </tr>
    );
  }
  
  export default BookCard;
  