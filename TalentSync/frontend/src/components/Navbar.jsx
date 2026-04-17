import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white flex items-center gap-2">
          <Zap className="text-blue-500 fill-blue-500" size={28} /> TalentSync <span className="text-blue-500">AI</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-slate-400 hover:text-white font-bold transition">Feed</Link>
          <Link to="/dashboard" className="text-slate-400 hover:text-white font-bold transition">Post Job</Link>
          
          {token ? (
            <button onClick={handleLogout} className="bg-red-500/10 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition">
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;