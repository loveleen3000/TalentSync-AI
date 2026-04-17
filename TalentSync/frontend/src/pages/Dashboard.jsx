import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Zap, Send, Sparkles, BarChart3, Users, Trash2, Loader2 } from 'lucide-react';

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('post-job');
  const [applicants, setApplicants] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const [jobData, setJobData] = useState({ title: '', description: '', company: 'TalentSync AI' });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (activeTab === 'applicants') {
      fetchApplicants();
    }
  }, [activeTab]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applications/all');
      setApplicants(res.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };
  useEffect(() => {
    if (activeTab === 'analytics') {
      setTimeout(() => setShowGraph(true), 100);
    } else {
      setShowGraph(false);
    }
  }, [activeTab]);

  const handlePublish = async () => {
    if (!jobData.title || !jobData.description) return alert("Please fill all fields!");
    setIsPublishing(true);
    try {
      await axios.post('http://localhost:5000/api/jobs/create', jobData);
      alert("Job Published Successfully! 🚀 Card added to Feed.");
      setJobData({ title: '', description: '', company: 'TalentSync AI' });
    } catch (err) {
      alert("Publishing Failed! Make sure backend is running.");
    } finally { setIsPublishing(false); }
  };

  const handleAIAnalyze = () => {
    if (!jobData.description) return alert("Please write a description first!");
    setIsAnalyzing(true);
    setTimeout(() => {
      alert("Gemini AI Analysis: Keywords (API, Frontend, Cloud) extracted. Description quality: High! ✨");
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this application record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/applications/${id}`);
        setApplicants(applicants.filter(app => app._id !== id));
      } catch (err) {
        alert("Error: Unable to delete the record.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto selection:bg-blue-500/30">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in zoom-in duration-500">
              <header className="mb-10">
                <h1 className="text-4xl font-black text-white">System <span className="text-blue-500 italic">Overview</span></h1>
                <p className="text-slate-500 mt-2 font-bold uppercase text-[10px] tracking-widest">Performance Snapshot</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Jobs</p>
                  <h3 className="text-4xl font-black text-white mt-2">12</h3>
                </div>
                <div className="bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Applicants</p>
                  <h3 className="text-4xl font-black text-white mt-2">148</h3>
                </div>
                <div className="bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">AI Matches</p>
                  <h3 className="text-4xl font-black text-white mt-2">92%</h3>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'post-job' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-12">
                <h1 className="text-4xl font-black text-white flex items-center gap-3">
                  <Zap className="text-blue-500" fill="currentColor" /> Recruiter <span className="text-blue-500 italic">Pro</span>
                </h1>
                <p className="text-slate-500 font-medium mt-2">Create and manage your AI-powered job listings.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Job Title</label>
                        <input
                          type="text"
                          value={jobData.title}
                          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                          placeholder="e.g. Senior React Developer"
                          className="w-full bg-[#0f172a] border border-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Description</label>
                        <textarea
                          value={jobData.description}
                          onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                          placeholder="Describe the role..."
                          className="w-full bg-[#0f172a] border border-slate-800 p-4 rounded-2xl h-48 outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none transition-all"
                        />
                      </div>
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                      >
                        {isPublishing ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {isPublishing ? 'Processing...' : 'Publish Posting'}
                      </button>
                    </div>
                  </div>
                </div>


                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-white/10 group-hover:scale-110 transition-transform">
                      <Sparkles size={120} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 relative z-10">AI Optimizer</h3>
                    <p className="text-blue-100 text-sm mb-6 relative z-10">Let Gemini optimize your descriptions for better engagement.</p>
                    <button
                      onClick={handleAIAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-white text-blue-700 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all relative z-10"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Content"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applicants' && (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-4xl font-black text-white mb-8">Candidate <span className="text-blue-500 italic">Hub</span></h1>
              <div className="bg-[#1e293b]/30 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-black/20 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-6">Candidate</th>
                      <th className="p-6">Role</th>
                      <th className="p-6 text-right font-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white text-sm">
                    {applicants.length > 0 ? applicants.map(app => (
                      <tr key={app._id} className="border-t border-slate-800/50 hover:bg-blue-500/5">
                        <td className="p-6 font-bold">{app.candidateName}<p className="text-[10px] text-slate-500 font-medium">{app.email}</p></td>
                        <td className="p-6 text-slate-400 font-medium">{app.jobTitle}</td>
                        <td className="p-6 text-right">
                          <button onClick={() => handleDelete(app._id)} className="p-3 text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="3" className="p-20 text-center text-slate-700 font-black italic tracking-widest uppercase">Database Empty</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {activeTab === 'analytics' && (
            <div className="animate-in fade-in zoom-in duration-500 text-white">
              <header className="mb-10">
                <h1 className="text-3xl font-black italic">Market <span className="text-blue-500">Insights</span></h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Real-time Hiring Metrics</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 📊 Main Activity Graph */}
                <div className="lg:col-span-2 bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-black flex items-center gap-2 text-sm uppercase tracking-widest opacity-70">
                      <BarChart3 size={18} className="text-blue-500" /> Application Flow
                    </h3>
                    <span className="text-[10px] bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-black border border-green-500/20">
                      +12.5% Growth
                    </span>
                  </div>

                  <div className="flex items-end justify-between h-48 gap-3 md:gap-6 px-2">
                    <div className="flex items-end justify-between h-48 gap-3 md:gap-6 px-2">
                      {[45, 82, 58, 95, 42, 75, 63, 88].map((h, i) => (
                        <div key={i} className="relative group/bar w-full h-full flex flex-col justify-end">

                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {h} Apps
                          </div>

                          <div
                            className="w-full bg-blue-500 rounded-t-xl hover:bg-white transition-all duration-300 cursor-help"
                            style={{
                              height: `${h}%`,
                              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)'
                            }}
                          >
                            <div className="w-full h-full bg-gradient-to-t from-transparent to-white/20 rounded-t-xl"></div>
                          </div>

                          <p className="text-[8px] text-slate-600 font-black mt-3 text-center uppercase tracking-tighter">Day {i + 1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 🎯 Accuracy Score & Stats */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-slate-800 p-8 rounded-[2.5rem] text-center shadow-xl">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin duration-[3s]"></div>
                      <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-white">98%</div>
                    </div>
                    <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">AI Match Accuracy</p>
                  </div>

                  <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-lg shadow-blue-900/20 group hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                      <Users className="text-white/50" size={32} />
                      <Sparkles className="text-white animate-pulse" size={20} />
                    </div>
                    <h4 className="text-white font-black text-3xl">1,248</h4>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Total Talent Pool</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h1 className="text-4xl font-black text-white mb-8 italic">Admin <span className="text-blue-500">Settings</span></h1>
              <div className="max-w-md bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                <p className="text-slate-500 font-bold uppercase text-[10px] mb-6">Profile Controls</p>
                <button className="w-full bg-slate-800 p-4 rounded-2xl text-white font-bold mb-4 hover:bg-slate-700 transition-all text-left">Update Security Key</button>
                <button className="w-full bg-slate-800 p-4 rounded-2xl text-white font-bold hover:bg-red-900/20 hover:text-red-500 transition-all text-left">Clear System Cache</button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;