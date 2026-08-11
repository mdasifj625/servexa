import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';
import InvoicesPage from './pages/InvoicesPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<div className="p-4 text-xl">Customers Page (Coming Soon)</div>} />
            <Route path="/vehicles" element={<div className="p-4 text-xl">Vehicles Page (Coming Soon)</div>} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            
            {/* Admin only route */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
