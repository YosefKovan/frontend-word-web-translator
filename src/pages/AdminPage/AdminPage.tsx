import PageHeader from "../../components/AdminComponents/PageHeader/PageHeader";
import AdminCards from "../../components/AdminComponents/AdminCards/AdminCards";
import SearchBar from "../../components/AdminComponents/SearchBar/SearchBar";
import UsersTable from "../../components/AdminComponents/UsersTable/UsersTable";
import "./AdminPage.css";
import {useAdmin} from "../../hooks/useAdmin";
import Spinner from "../../components/Spinner/Spinner";


export default function AdminPage() {

  const { isPending, error, data } = useAdmin()
   

  return (
    <div className="admin-page">
      <PageHeader
          title="User Management"
          subtitle="Monitor and manage your language learning community performance."
          onAddUser={() => console.log("Add user clicked")}
        />
      {isPending && <Spinner />}  
      {!error && data && <>
        <AdminCards totalUsers={data.total_users} activeToday={data.active_users} totalWords={data.total_words_in_system} />
        <SearchBar />
        <UsersTable users={data.users} />
      </>}
    </div>
  );
}
