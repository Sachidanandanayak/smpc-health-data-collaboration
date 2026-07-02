import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, CheckCircle2, AlertTriangle, Plus, Server, Lock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const activeComputations = [
  { id: 'SMPC-771', name: 'Federated ResNet-50 Training', progress: 85, status: 'Running', nodes: 4, algorithm: 'Gradient Aggregation' },
  { id: 'SMPC-772', name: 'Multi-cohort survival analysis', progress: 100, status: 'Completed', nodes: 2, algorithm: 'Secure Logistic Regression' },
  { id: 'SMPC-773', name: 'Genomic Variant GWAS', progress: 0, status: 'Pending', nodes: 3, algorithm: 'Yao\'s Garbled Circuits' },
];

const Computation = () => {
  return (
    <div className="font-sans">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Cpu className="text-accent" /> SMPC Computation
          </h1>
          <p className="text-gray-400 mt-2">Orchestrate zero-knowledge algorithms across connected hospital nodes.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-gradient-to-r from-accent to-primary px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform w-max">
          <Plus className="w-4 h-4" /> Create Collaboration
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Active Pipelines */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Active Pipelines</h2>
          
          {activeComputations.map((comp, i) => (
            <GlassCard key={comp.id} className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{comp.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="font-mono text-accent/80">{comp.id}</span>
                    <span className="flex items-center gap-1"><Server className="w-3 h-3" /> {comp.nodes} Nodes</span>
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> {comp.algorithm}</span>
                  </div>
                </div>
                
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 w-max ${
                  comp.status === 'Running' ? 'bg-accent/10 text-accent border-accent/20' :
                  comp.status === 'Completed' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                  'bg-gray-400/10 text-gray-400 border-gray-400/20'
                }`}>
                  {comp.status === 'Running' && <div className="w-2 h-2 rounded-full bg-accent animate-ping" />}
                  {comp.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {comp.status === 'Pending' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {comp.status}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Cryptographic Progress</span>
                  <span className="font-mono text-white">{comp.progress}%</span>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.progress}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`h-full rounded-full ${
                      comp.status === 'Running' ? 'bg-gradient-to-r from-accent to-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                      comp.status === 'Completed' ? 'bg-green-400' : 'bg-gray-600'
                    }`}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
           <GlassCard className="p-6">
             <h3 className="text-lg font-bold text-white mb-4">Node Network Status</h3>
             <div className="space-y-4">
               {['Mayo Clinic', 'Johns Hopkins', 'Stanford Med'].map((node, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center border border-green-400/20">
                       <Server className="w-4 h-4 text-green-400" />
                     </div>
                     <span className="text-sm font-medium text-gray-200">{node}</span>
                   </div>
                   <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                 </div>
               ))}
             </div>
           </GlassCard>
           
           <GlassCard className="p-6 bg-gradient-to-br from-primary/10 to-transparent">
             <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-4">
               <Cpu className="w-6 h-6 text-primary" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">Need more compute?</h3>
             <p className="text-sm text-gray-400 mb-4">Scale up your homomorphic encryption validators to increase throughput by 40%.</p>
             <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold text-white border border-white/10">
               Allocate Resources
             </button>
           </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default Computation;
