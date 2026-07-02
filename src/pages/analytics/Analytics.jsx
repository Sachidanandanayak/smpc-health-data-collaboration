import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GlassCard from '../../components/GlassCard';

const performanceData = [
  { month: 'Jan', collaborations: 12, insights: 45 },
  { month: 'Feb', collaborations: 19, insights: 62 },
  { month: 'Mar', collaborations: 25, insights: 89 },
  { month: 'Apr', collaborations: 32, insights: 110 },
  { month: 'May', collaborations: 45, insights: 156 },
  { month: 'Jun', collaborations: 56, insights: 210 },
];

const diseaseMetrics = [
  { subject: 'Oncology', A: 120, fullMark: 150 },
  { subject: 'Cardiology', A: 98, fullMark: 150 },
  { subject: 'Neurology', A: 86, fullMark: 150 },
  { subject: 'Genomics', A: 99, fullMark: 150 },
  { subject: 'Pediatrics', A: 85, fullMark: 150 },
  { subject: 'Immunology', A: 65, fullMark: 150 },
];

const Analytics = () => {
  return (
    <div className="font-sans">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="text-pink-400" /> Research Analytics
          </h1>
          <p className="text-gray-400 mt-2">Macro-level insights generated from secure multi-party collaborations.</p>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
          Export Full Report PDF
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Insights Generated', val: '2,482', icon: Target, color: 'text-pink-400' },
          { label: 'Platform Growth', val: '+45%', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Global Models', val: '14', icon: Activity, color: 'text-blue-400' },
          { label: 'Active Researchers', val: '892', icon: BarChart3, color: 'text-purple-400' },
        ].map((stat, i) => (
          <GlassCard key={i} delay={i * 0.1} className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-white mt-2">{stat.val}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6">Collaboration & Insight Generation Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorCollabs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(11, 17, 32, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="insights" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorInsights)" />
              <Area type="monotone" dataKey="collaborations" stroke="#f472b6" strokeWidth={2} fillOpacity={1} fill="url(#colorCollabs)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Research Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={diseaseMetrics}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Radar name="Research Focus" dataKey="A" stroke="#f472b6" fill="#f472b6" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Analytics;
