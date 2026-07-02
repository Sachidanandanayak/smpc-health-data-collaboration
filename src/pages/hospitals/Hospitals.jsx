import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const dummyHospitals = [
  { id: 'HSP-001', name: 'Mayo Clinic', region: 'North America', datasets: 12, status: 'Active', joinDate: '2023-01-15' },
  { id: 'HSP-002', name: 'Johns Hopkins', region: 'North America', datasets: 8, status: 'Active', joinDate: '2023-03-22' },
  { id: 'HSP-003', name: 'Cleveland Clinic', region: 'North America', datasets: 15, status: 'Active', joinDate: '2023-05-10' },
  { id: 'HSP-004', name: 'Stanford Medicine', region: 'North America', datasets: 6, status: 'Pending Approval', joinDate: '2023-08-01' },
];

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="font-sans">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Building2 className="text-primary" /> Hospital Management
          </h1>
          <p className="text-gray-400 mt-2">Manage connected clinical institutions and their access levels.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search hospitals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-5 py-2 rounded-full text-sm font-bold text-white shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Add Hospital
          </button>
        </div>
      </header>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-xl">ID</th>
                <th className="px-6 py-4 font-semibold">Hospital Name</th>
                <th className="px-6 py-4 font-semibold">Region</th>
                <th className="px-6 py-4 font-semibold">Datasets</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dummyHospitals.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase())).map((hospital, index) => (
                <motion.tr 
                  key={hospital.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-gray-500">{hospital.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{hospital.name}</td>
                  <td className="px-6 py-4">{hospital.region}</td>
                  <td className="px-6 py-4 text-primary font-bold">{hospital.datasets}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      hospital.status === 'Active' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                      'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                    }`}>
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-gray-400 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

export default Hospitals;
