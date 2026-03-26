import './SearchBar.css';

interface SearchBarProps {
  query: string;
  onQueryChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
}

export default function SearchBar({ query, onQueryChange, statusFilter, onStatusChange, sortBy, onSortChange }: SearchBarProps) {
  return (
    <div className="search-bar">

      <div className="search-bar__input-wrapper">
        <span className="material-symbols-outlined search-bar__input-icon">search</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="search-bar__filters">

        <div className="search-bar__select-wrapper">
          <span className="material-symbols-outlined search-bar__select-icon">shield</span>
          <select className="search-bar__select" value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Status: All</option>
            <option value="active">Active</option>
            <option value="inactive">Not Active</option>
          </select>
          <span className="material-symbols-outlined search-bar__select-chevron">expand_more</span>
        </div>

        <div className="search-bar__select-wrapper">
          <span className="material-symbols-outlined search-bar__select-icon">sort</span>
          <select className="search-bar__select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
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
