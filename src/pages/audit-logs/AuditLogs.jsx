import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Search, Download, ShieldCheck, AlertOctagon, UserCheck, Database, Key } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const dummyLogs = [
  { id: 'LOG-1029', user: 'Dr. Sarah Chen', action: 'Login Success', category: 'Authentication', ip: '192.168.1.45', status: 'Success', time: '10:42 AM' },
  { id: 'LOG-1030', user: 'System', action: 'Homomorphic Key Exchange', category: 'Security', ip: 'Internal', status: 'Success', time: '10:45 AM' },
  { id: 'LOG-1031', user: 'Admin User', action: 'Role Updated (Analyst -> Researcher)', category: 'Access Control', ip: '10.0.0.12', status: 'Success', time: '11:05 AM' },
  { id: 'LOG-1032', user: 'Node-Alpha', action: 'Dataset Upload: Genomics Batch 4', category: 'Data Management', ip: '172.16.254.1', status: 'Success', time: '11:30 AM' },
  { id: 'LOG-1033', user: 'Unknown', action: 'Failed Login Attempt (Invalid Password)', category: 'Authentication', ip: '45.22.19.88', status: 'Failed', time: '12:15 PM' },
  { id: 'LOG-1034', user: 'System', action: 'SMPC Computation Started (Federated ResNet)', category: 'Computation', ip: 'Internal', status: 'Success', time: '01:00 PM' },
  { id: 'LOG-1035', user: 'Dr. James Wilson', action: 'Exported Research Insights PDF', category: 'Data Management', ip: '192.168.1.88', status: 'Warning', time: '02:22 PM' },
];

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Authentication': return <UserCheck className="w-4 h-4 text-blue-400" />;
    case 'Security': return <Key className="w-4 h-4 text-purple-400" />;
    case 'Access Control': return <ShieldCheck className="w-4 h-4 text-green-400" />;
    case 'Data Management': return <Database className="w-4 h-4 text-yellow-400" />;
    default: return <ShieldAlert className="w-4 h-4 text-gray-400" />;
  }
};

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="font-sans">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-red-400" /> Security Audit Logs
          </h1>
          <p className="text-gray-400 mt-2">Immutable ledger of all system events, authentication attempts, and cryptographic handshakes.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search event ID, user, or action..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all w-72"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-xl">Event ID</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">User / System</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Action Detail</th>
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dummyLogs.filter(log => 
                log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.id.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((log, index) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-4 text-white font-medium">{log.user}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-black/20 w-max px-3 py-1 rounded-full border border-white/5">
                      {getCategoryIcon(log.category)}
                      <span className="text-xs font-medium text-gray-300">{log.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">{log.ip}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 ${
                      log.status === 'Success' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                      log.status === 'Warning' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' :
                      'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {log.status === 'Failed' && <AlertOctagon className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AuditLogs;
