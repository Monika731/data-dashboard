import { useState, useEffect } from "react";
import "./App.css";
import BookCard from "./components/BookCard";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";
import "./components/BookCard.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filterYear, setFilterYear] = useState(null);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(3000);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://openlibrary.org/subjects/fantasy.json?limit=50");
        const data = await res.json();
        const works = data.works;

        setBooks(works);
        setLoading(false);

        const years = works
          .map((book) => book.first_publish_year)
          .filter((y) => y !== undefined);

        const min = Math.min(...years);
        const max = Math.max(...years);
        setMinYear(min);
        setMaxYear(max);
        setFilterYear(min);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const year = book.first_publish_year || 0;
    const matchesYear = year >= filterYear;
  
    return matchesTitle && matchesYear;
  });

  return (
    <div className="App">
      <h1>OpenLibrary Fantasy Books</h1> <br/>

      <div className="controls-row">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {!loading && (
          <FilterBar
            filterYear={filterYear}
            setFilterYear={setFilterYear}
            minYear={minYear}
            maxYear={maxYear}
          />
        )}
      </div>

      {!loading && <SummaryCards books={filteredBooks} />}
      <br/><br/>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author(s)</th>
              <th>First Published</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                authors={book.authors?.map((a) => a.name) || ["Unknown"]}
                publishYear={book.first_publish_year || "N/A"}
                subjects={book.subject}
                coverId={book.cover_id}
                searchTerm={searchTerm}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
