import { useState } from "react";
import PageHeader from "../../components/AdminComponents/PageHeader/PageHeader";
import AdminCards from "../../components/AdminComponents/AdminCards/AdminCards";
import SearchBar from "../../components/AdminComponents/SearchBar/SearchBar";
import UsersTable from "../../components/AdminComponents/UsersTable/UsersTable";
import "./AdminPage.css";
import { useAdmin } from "../../hooks/useAdmin";
import Spinner from "../../components/Spinner/Spinner";
import type { User } from "../../types/user";

export default function AdminPage() {
  const { isPending, error, data } = useAdmin();

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredUsers: User[] = (data?.users ?? [])
    .filter((u) => {
      const matchesName = u.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === '' || u.status === statusFilter;
      return matchesName && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'last_active') return new Date(b.last_active).getTime() - new Date(a.last_active).getTime();
      if (sortBy === 'progress_score') return b.progress_score - a.progress_score;
      if (sortBy === 'words_count') return b.words_count - a.words_count;
      return 0;
    });

  return (
    <div className="admin-page">
      <PageHeader
        title="User Management"
        subtitle="Monitor and manage your language learning community performance."
      />
      {isPending && <Spinner />}
      {!error && data && <>
        <AdminCards totalUsers={data.total_users} activeToday={data.active_users} totalWords={data.total_words_in_system} />
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <UsersTable users={filteredUsers} />
      </>}
    </div>
  );
}
