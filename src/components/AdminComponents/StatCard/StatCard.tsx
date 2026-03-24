import './StatCard.css';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  accent?: 'blue' | 'green' | 'orange';
}

export default function StatCard({ icon, value, label, accent = 'blue' }: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-card__icon-wrapper">
        <span className="material-symbols-outlined stat-card__icon">{icon}</span>
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}
