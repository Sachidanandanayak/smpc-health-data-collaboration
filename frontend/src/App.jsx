import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FloatingParticles from './components/FloatingParticles';
import GlassCard from './components/GlassCard';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
      <GlassCard className="max-w-3xl text-center p-12">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          SMPC Health Data Collaboration
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Privacy-Preserving Health Data Computation with Futuristic Security.
        </p>
        <Link to="/dashboard" className="px-8 py-4 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)]">
          Enter Platform
        </Link>
      </GlassCard>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen p-8 relative z-10">
      <header className="mb-12 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link to="/" className="text-primary hover:text-white transition-colors">Logout</Link>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Hospitals</h3>
          <p className="text-4xl font-bold text-white mt-2">1,248</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Collaborations</h3>
          <p className="text-4xl font-bold text-primary mt-2">56</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Secure Computations</h3>
          <p className="text-4xl font-bold text-secondary mt-2">1.2M</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Security Score</h3>
          <p className="text-4xl font-bold text-green-400 mt-2">99.9%</p>
        </GlassCard>
      </div>

      <div className="mt-12">
        <GlassCard className="p-8 h-96 flex items-center justify-center">
          <p className="text-gray-400 text-lg">Analytics Chart Placeholder (Recharts)</p>
        </GlassCard>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <FloatingParticles />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
