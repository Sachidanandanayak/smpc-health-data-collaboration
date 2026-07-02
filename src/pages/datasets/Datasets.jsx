import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, UploadCloud, Download, Trash2, ShieldCheck, Clock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const dummyDatasets = [
  { id: 'DS-901', name: 'Oncology Patient Records (2023)', size: '4.2 TB', status: 'Encrypted', date: 'Oct 12, 2023', hospital: 'Mayo Clinic' },
  { id: 'DS-902', name: 'Cardiology Vital Signs Time-series', size: '8.5 TB', status: 'Encrypted', date: 'Oct 14, 2023', hospital: 'Cleveland Clinic' },
  { id: 'DS-903', name: 'Genomic Sequences Batch 4', size: '15.1 TB', status: 'Processing', date: 'Oct 15, 2023', hospital: 'Johns Hopkins' },
  { id: 'DS-904', name: 'Neurology MRI Scans', size: '2.8 TB', status: 'Encrypted', date: 'Oct 18, 2023', hospital: 'Stanford Medicine' },
];

const Datasets = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="font-sans">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Database className="text-secondary" /> Dataset Management
          </h1>
          <p className="text-gray-400 mt-2">Securely upload and manage homomorphically encrypted datasets.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search datasets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-secondary to-primary px-5 py-2 rounded-full text-sm font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
            <UploadCloud className="w-4 h-4" /> Upload Dataset
          </button>
        </div>
      </header>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-xl">Dataset Name</th>
                <th className="px-6 py-4 font-semibold">Origin</th>
                <th className="px-6 py-4 font-semibold">Size</th>
                <th className="px-6 py-4 font-semibold">Upload Date</th>
                <th className="px-6 py-4 font-semibold">Security Status</th>
                <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dummyDatasets.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dataset, index) => (
                <motion.tr 
                  key={dataset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    <div className="flex flex-col">
                      <span>{dataset.name}</span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">{dataset.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{dataset.hospital}</td>
                  <td className="px-6 py-4 text-secondary font-bold">{dataset.size}</td>
                  <td className="px-6 py-4 text-gray-400">{dataset.date}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 w-max rounded-full text-xs font-medium border ${
                      dataset.status === 'Encrypted' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                      'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                    }`}>
                      {dataset.status === 'Encrypted' ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3 animate-spin" />}
                      {dataset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-gray-400 hover:text-primary transition-colors" title="Download Metadata"><Download className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
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

export default Datasets;
