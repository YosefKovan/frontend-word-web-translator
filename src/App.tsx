import "./App.css";
import AdminPage from "./pages/AdminPage/AdminPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminPage />
      <ToastContainer position="top-right" autoClose={5000} />
    </QueryClientProvider>
  );
}

export default App;
