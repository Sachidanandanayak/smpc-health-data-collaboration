import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Play, Network, ChevronDown, Download, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../../components/GlassCard';

const accuracyData = [
  { epoch: '1', accuracy: 52 },
  { epoch: '10', accuracy: 68 },
  { epoch: '20', accuracy: 75 },
  { epoch: '30', accuracy: 82 },
  { epoch: '40', accuracy: 89 },
  { epoch: '50', accuracy: 94 },
];

const models = [
  { name: 'Federated Neural Network', params: '12.4M', status: 'Ready' },
  { name: 'Secure Random Forest', params: '150 Trees', status: 'Training...' },
  { name: 'Privacy-Preserving Logistic Regression', params: '10K', status: 'Ready' },
  { name: 'Encrypted Decision Tree', params: 'Depth 20', status: 'Ready' },
];

const AITraining = () => {
  return (
    <div className="font-sans">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="text-purple-400" /> AI Model Training
          </h1>
          <p className="text-gray-400 mt-2">Train distributed AI models on homomorphically encrypted datasets.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Model Selection */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Available Architectures</h3>
            <div className="space-y-3">
              {models.map((model, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${idx === 1 ? 'bg-purple-500/10 border-purple-500/30' : 'bg-black/20 border-white/10 hover:bg-white/5'} transition-colors cursor-pointer group`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white text-sm">{model.name}</h4>
                    <span className="text-xs text-gray-500 font-mono">{model.params}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${model.status === 'Training...' ? 'bg-purple-400/20 text-purple-400' : 'bg-green-400/10 text-green-400'}`}>
                      {model.status}
                    </span>
                    {idx !== 1 && <Play className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Training Console */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" /> Live Training: Secure Random Forest
              </h3>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Download className="w-3 h-3" /> Export Weights
                </button>
                <button className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-bold text-purple-400 hover:bg-purple-500/30 transition-colors">
                  Stop Training
                </button>
              </div>
            </div>

            <div className="h-[300px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="epoch" stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" tick={{fill: '#888', fontSize: 12}} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(11, 17, 32, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#c084fc' }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#c084fc" strokeWidth={3} dot={{ fill: '#c084fc', r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 h-32 overflow-y-auto">
              <div className="text-green-400 mb-1">[SYSTEM] Initiating secure enclave... OK</div>
              <div className="mb-1">[NODE 1] Loaded dataset partition 1/4</div>
              <div className="mb-1">[NODE 2] Loaded dataset partition 2/4</div>
              <div className="mb-1">[NODE 3] Loaded dataset partition 3/4</div>
              <div className="text-purple-400 mb-1">[AGGREGATOR] Commencing Epoch 45...</div>
              <div className="mb-1">  - Validating homomorphic proofs: SUCCESS</div>
              <div className="mb-1 text-white">  - Accuracy metric updated: 89.2%</div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default AITraining;
