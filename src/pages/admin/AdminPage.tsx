import { useSiteData } from '../../context/SiteDataContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const { isAuthenticated } = useSiteData();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  return <AdminDashboard />;
}
