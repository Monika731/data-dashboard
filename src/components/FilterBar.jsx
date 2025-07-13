import './FilterBar.css';

function FilterBar({ filterYear, setFilterYear, minYear, maxYear }) {
  return (
    <div className="filter-bar-container">
      <label htmlFor="year-range">
        <strong>First Published: {filterYear}</strong>
      </label>
      <input
        id="year-range"
        type="range"
        min={minYear}
        max={maxYear}
        value={filterYear}
        onChange={(e) => setFilterYear(parseInt(e.target.value))}
        className="slider"
      />
    </div>
  );
}

export default FilterBar;
