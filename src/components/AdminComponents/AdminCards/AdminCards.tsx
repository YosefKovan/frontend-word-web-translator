import StatCard from '../StatCard/StatCard';
import './AdminCards.css';

interface AdminCardsProps {
  totalUsers: number;
  activeToday: number;
  totalWords: number;
}

export default function AdminCards({ totalUsers, activeToday, totalWords }: AdminCardsProps) {
  return (
    <section className="admin-cards">
      <StatCard
        icon="group"
        value={totalUsers.toLocaleString()}
        label="Total Users"
        accent="blue"
      />
      <StatCard
        icon="bolt"
        value={activeToday.toLocaleString()}
        label="Active Today"
        accent="green"
      />
      <StatCard
        icon="translate"
        value={totalWords.toLocaleString()}
        label="Amount of Words"
        accent="orange"
      />
    </section>
  );
}
