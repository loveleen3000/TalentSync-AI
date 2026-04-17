import React from 'react';
import { LayoutDashboard, PlusSquare, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ setActiveTab, activeTab }) => {
  const menuItems = [
    { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { id: 'post-job', icon: <PlusSquare size={20} />, label: 'Post New Job' },
    { id: 'applicants', icon: <Users size={20} />, label: 'Applicants' },
    { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-[calc(100vh-64px)] sticky top-16">
      <div className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-black transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
              : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-black hover:bg-red-500/10 rounded-xl transition-all active:scale-95"
        >
          <LogOut size={20} />
          <span className="text-sm uppercase tracking-widest font-bold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;