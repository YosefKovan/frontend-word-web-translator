import { BrowserRouter } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import ToastProvider from './components/ToastProvider'
import AppRoutes from './components/AppRoutes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
