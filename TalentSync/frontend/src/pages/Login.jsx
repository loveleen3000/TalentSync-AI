import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      
      window.location.href = '/dashboard'; 

    } catch (err) { 
      alert("Login Fail! Check your credentials."); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4">
      <div className="w-full max-w-md bg-[#1e293b]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <Zap className="mx-auto text-blue-500 mb-4" size={44} />
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">Ready to sync your talent?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                name="email_field" 
                autoComplete="off" 
                placeholder="Enter email address"
                className="w-full bg-[#0f172a] border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                name="password_field"
                autoComplete="new-password"
                placeholder="••••••••" 
                className="w-full bg-[#0f172a] border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-900/20">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase">
          New here? <Link to="/register" className="text-blue-400 hover:underline">Register Hub</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;