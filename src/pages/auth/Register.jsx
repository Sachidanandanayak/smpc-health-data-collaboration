import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Mail, Building2, Phone, Lock } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate auth by saving to local storage
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent px-4 py-12">
      <GlassCard className="w-full max-w-2xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] mb-4">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-2 tracking-wide uppercase">
            MediSecure AI
          </h1>
          <h2 className="text-3xl font-bold text-white mb-2">Request Access</h2>
          <p className="text-gray-400 text-sm text-center">Join the secure multi-party computation network.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600" placeholder="Dr. Sarah Chen" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Hospital / Institution</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600" placeholder="Mayo Clinic" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600" placeholder="researcher@hospital.org" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Role Request</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all appearance-none cursor-pointer" required>
                <option value="" className="bg-background">Select a role...</option>
                <option value="researcher" className="bg-background">Clinical Researcher</option>
                <option value="admin" className="bg-background">Hospital Admin</option>
                <option value="analyst" className="bg-background">Data Analyst</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="password" className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600" placeholder="••••••••" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="password" className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600" placeholder="••••••••" required />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" required className="w-4 h-4 rounded border-gray-600 text-secondary focus:ring-secondary bg-black/20" />
            <span className="text-sm text-gray-400">I agree to the <a href="#" className="text-secondary hover:underline">Terms of Cryptographic Service</a> and Privacy Policy.</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-bold tracking-wide shadow-lg mt-4"
          >
            Submit Access Request
          </motion.button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-secondary hover:underline">Authenticate Here</Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
