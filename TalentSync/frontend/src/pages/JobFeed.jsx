import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Briefcase, Sparkles } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs/all');
        setJobs(res.data);
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-6xl mx-auto">
       
        <header className="text-center mb-10 animate-in fade-in duration-700">
          <h1 className="text-3xl md:text-3xl font-black mb-2 tracking-tight">
            Find Your Next <span className="text-blue-500 italic">Level.</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            Neural Opportunity Grid
          </p>
          
          <div className="max-w-xs mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Filter roles..." 
              className="w-full bg-[#0f172a] border border-slate-800 p-2.5 pl-10 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 transition-all text-xs"
            />
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-slate-700 font-bold uppercase tracking-widest text-[10px]">
            Connecting...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job._id} className="bg-[#0f172a]/80 border border-slate-800 p-6 rounded-[2rem] hover:border-blue-500/40 transition-all group flex flex-col justify-between hover:shadow-[0_0_25px_rgba(37,99,235,0.05)]">
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-9 h-9 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <Briefcase size={16} />
                    </div>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter bg-slate-800/50 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>

                  <h3 className="text-base font-black mb-1 group-hover:text-blue-400 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-blue-500/50 font-bold text-[9px] uppercase tracking-widest mb-4">
                    {job.company || "TALENTSYNC AI"}
                  </p>
                  
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-6 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <button 
                  onClick={() => handleApply(job)}
                  className="w-full bg-white text-black hover:bg-blue-600 hover:text-white py-2.5 rounded-xl font-black text-[11px] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Quick Apply <Sparkles size={12} />
                </button>
              </div>
            )) : (
              <div className="col-span-full text-center py-16 border border-dashed border-slate-800 rounded-[2rem]">
                <p className="text-slate-700 font-bold text-xs uppercase tracking-widest italic">Scanning database...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedJob && (
        <ApplyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          jobTitle={selectedJob.title}
          company={selectedJob.company}
        />
      )}
    </div>
  );
};

export default JobFeed;