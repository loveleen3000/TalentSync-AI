import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert("Registration Successful.");
            navigate('/login');
        } catch (err) {
            alert("Registration fail! Email shayad pehle se hai.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md bg-[#1e293b]/50 backdrop-blur-2xl p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative z-10 text-center">
                <UserPlus className="mx-auto text-blue-500 mb-6" size={48} />
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h2>
                <p className="text-slate-400 font-medium mb-10">Join TalentSync AI and start hiring smarter.</p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-4 text-slate-500" size={20} />
                            <input type="text" placeholder="Enter Username"
                                className="w-full bg-[#0f172a] border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account ID</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                name={`field_${Math.random()}`}
                                autoComplete="new-off"
                                placeholder="Enter email address"
                                className="w-full bg-[#0f172a] border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                name={`pass_${Math.random()}`}
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full bg-[#0f172a] border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95">
                        Get Started <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase">
                    Do you have an account ? <Link to="/login" className="text-blue-400 hover:underline">Please Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;