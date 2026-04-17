import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload, Send, FileText } from 'lucide-react';

const ApplyModal = ({ isOpen, onClose, jobTitle, company }) => {
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/applications/apply', {
        jobTitle,
        company: company || "TalentSync AI",
        candidateName: "Alice",
        email: "Alice@gmail.com",      
        resumeLink,
        coverLetter
      });

      if (res.status === 201) {
        alert("Application Processed Successfully! 🚀");
        onClose(); 
      }
    } catch (err) {
      alert("Submission failed! Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="bg-[#0f172a] border border-slate-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10 relative animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <header className="mb-8">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">Apply for {jobTitle}</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{company}</p>
          </header>

          <form onSubmit={handleApply} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Resume Link (Google Drive/Dropbox)</label>
              <div className="relative">
                <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="url" 
                  required
                  placeholder="https://drive.google.com/..."
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className="w-full bg-[#020617] border border-slate-800 p-3.5 pl-12 rounded-2xl outline-none focus:ring-1 focus:ring-blue-500 text-white text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Why should we hire you?</label>
              <textarea 
                required
                placeholder="Tell us about your skills..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full bg-[#020617] border border-slate-800 p-4 rounded-2xl h-32 outline-none focus:ring-1 focus:ring-blue-500 text-white text-sm resize-none transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
            >
              {loading ? "Processing..." : "Submit Application"} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;