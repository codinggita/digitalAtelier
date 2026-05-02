import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
