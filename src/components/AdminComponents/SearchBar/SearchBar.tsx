import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar">

      <div className="search-bar__input-wrapper">
        <span className="material-symbols-outlined search-bar__input-icon">search</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search by name..."
        />
      </div>

      <div className="search-bar__filters">

        <div className="search-bar__select-wrapper">
          <span className="material-symbols-outlined search-bar__select-icon">shield</span>
          <select className="search-bar__select">
            <option value="">Status: All</option>
            <option value="active">Active (last 7 days)</option>
            <option value="inactive">Not Active (last 7 days)</option>
          </select>
          <span className="material-symbols-outlined search-bar__select-chevron">expand_more</span>
        </div>

        <div className="search-bar__select-wrapper">
          <span className="material-symbols-outlined search-bar__select-icon">sort</span>
          <select className="search-bar__select">
            <option value="">Sort by: Default</option>
            <option value="last_active">Last Active</option>
            <option value="progress_score">Progress Score</option>
            <option value="words_count">Words Count</option>
          </select>
          <span className="material-symbols-outlined search-bar__select-chevron">expand_more</span>
        </div>

      </div>
    </div>
  );
}
