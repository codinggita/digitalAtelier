import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#1c1c1c] text-white p-4">
      {/* Container simulating the desktop app window wrapper */}
      <div className="flex w-full bg-white text-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl relative">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
