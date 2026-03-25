import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAddUser?: () => void;
}

export default function PageHeader({ title, subtitle, onAddUser }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__subtitle">{subtitle}</p>
      </div>
      <button className="page-header__button" onClick={onAddUser}>
        <span>New User</span>
        <span className="material-symbols-outlined">person_add</span>
      </button>
    </div>
  );
}
