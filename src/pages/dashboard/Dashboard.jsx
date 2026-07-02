import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Database, Activity as ActivityIcon, Shield, ChevronRight, Server } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

// Dummy Data (Copied from previous App.jsx)
const performanceData = [
  { epoch: '10', loss: 0.85, val_loss: 0.82 },
  { epoch: '20', loss: 0.65, val_loss: 0.68 },
  { epoch: '30', loss: 0.45, val_loss: 0.50 },
  { epoch: '40', loss: 0.30, val_loss: 0.35 },
  { epoch: '50', loss: 0.22, val_loss: 0.28 },
  { epoch: '60', loss: 0.15, val_loss: 0.18 },
  { epoch: '70', loss: 0.12, val_loss: 0.15 },
];

const datasetData = [
  { name: 'Mayo Clinic', tb: 12.5 },
  { name: 'Johns Hopkins', tb: 8.2 },
  { name: 'Cleveland', tb: 15.4 },
  { name: 'Stanford Med', tb: 6.8 },
];

const auditLogs = [
  { id: 'EV-8921', action: 'Homomorphic Key Exchange', node: 'Node-Alpha', status: 'Success', time: '2 mins ago' },
  { id: 'EV-8922', action: 'Gradient Aggregation', node: 'Global-Aggregator', status: 'Success', time: '5 mins ago' },
  { id: 'EV-8923', action: 'Dataset Connection Request', node: 'Node-Gamma', status: 'Pending', time: '12 mins ago' },
  { id: 'EV-8924', action: 'Zero-Knowledge Proof Verify', node: 'Node-Beta', status: 'Success', time: '18 mins ago' },
];

const GlassButton = ({ children, onClick, className }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 245, 255, 0.4)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative overflow-hidden px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white font-medium backdrop-blur-md transition-colors hover:bg-white/10 ${className}`}
  >
    {children}
  </motion.button>
);

const Dashboard = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Console</h1>
        <p className="text-gray-400 mt-2">Real-time overview of secure multi-party operations.</p>
      </header>

      {/* Main Grid Layout */}
      <motion.div 
        animate={{ x: mousePos.x * -1, y: mousePos.y * -1 }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        
        {/* Top Stats Overview */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Hospitals', val: '4', icon: Users, color: 'text-primary' },
            { label: 'Total Patient Records', val: '12.4M', icon: Database, color: 'text-secondary' },
            { label: 'SMPC Models Training', val: '3', icon: ActivityIcon, color: 'text-accent' },
            { label: 'Privacy Confidence', val: '99.9%', icon: Shield, color: 'text-green-400' },
          ].map((stat, i) => (
            <GlassCard key={i} delay={i * 0.1} className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider relative z-10">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-1 tracking-tight relative z-10">{stat.val}</p>
            </GlassCard>
          ))}
        </div>

        {/* AI Training Progress Chart */}
        <div className="lg:col-span-8">
          <GlassCard delay={0.4} className="p-6 h-full flex flex-col relative overflow-hidden min-h-[400px]">
             <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
             <div className="mb-6 flex justify-between items-end relative z-10">
               <div>
                  <h3 className="text-xl font-bold text-white mb-1">AI Model Convergence</h3>
                  <p className="text-sm text-gray-400">Federated Training Loss over Epochs</p>
               </div>
               <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Training
               </div>
             </div>
             <div className="flex-grow relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="epoch" stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(11, 17, 32, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="loss" stroke="#00F5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorLoss)" />
                    <Area type="monotone" dataKey="val_loss" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </GlassCard>
        </div>

        {/* Dataset Contribution & Collaboration */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard delay={0.5} className="p-6 flex-1 min-h-[250px]">
            <h3 className="text-xl font-bold text-white mb-1">Dataset Contributions</h3>
            <p className="text-sm text-gray-400 mb-6">Encrypted records by institution (TB)</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datasetData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#888" tick={{fill: '#fff', fontSize: 12}} width={100} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}/>
                  <Bar dataKey="tb" fill="#3B82F6" radius={[0, 8, 8, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard delay={0.6} className="p-6 flex-1 relative overflow-hidden group min-h-[150px]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div>
                 <div className="p-3 bg-secondary/30 rounded-xl inline-block mb-4 border border-secondary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                   <ActivityIcon className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Research Insights</h3>
               </div>
               <GlassButton className="mt-4 w-full flex justify-between items-center bg-white/5 hover:bg-white/10 text-sm">
                 Open Insights Engine <ChevronRight className="w-4 h-4" />
               </GlassButton>
            </div>
          </GlassCard>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-12">
          <GlassCard delay={0.7} className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">System Audit Logs</h3>
              <GlassButton className="text-xs px-4 py-1.5 border-none bg-white/5">Export CSV</GlassButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-semibold rounded-tl-xl">Event ID</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                    <th className="px-6 py-4 font-semibold">Node Origin</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold rounded-tr-xl">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {auditLogs.map((log, index) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1) }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-primary/80">{log.id}</td>
                      <td className="px-6 py-4 text-white">{log.action}</td>
                      <td className="px-6 py-4 flex items-center gap-2"><Server className="w-3 h-3 text-gray-500"/> {log.node}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          log.status === 'Success' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                          'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{log.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
