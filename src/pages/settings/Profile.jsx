import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building2, Phone, Camera, Shield } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const Profile = () => {
  return (
    <div className="font-sans max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <User className="text-primary" /> Profile Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your researcher identity and credentials.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Section */}
        <div className="md:col-span-1">
          <GlassCard className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-black hover:bg-white transition-colors shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">Dr. Sarah Chen</h2>
            <p className="text-primary text-sm font-medium mt-1">Lead Researcher</p>
            <div className="mt-4 px-3 py-1 bg-green-400/10 border border-green-400/20 text-green-400 rounded-full text-xs flex items-center justify-center gap-1.5 w-max mx-auto">
              <Shield className="w-3 h-3" /> Identity Verified
            </div>
          </GlassCard>
        </div>

        {/* Form Section */}
        <div className="md:col-span-2">
          <GlassCard className="p-8">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Personal Information</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" defaultValue="Dr. Sarah Chen" className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="email" defaultValue="sarah.chen@hospital.org" className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-400 cursor-not-allowed focus:outline-none transition-all" readOnly />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Institution</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" defaultValue="Mayo Clinic" className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="tel" defaultValue="+1 (555) 019-2831" className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                <button type="button" className="px-6 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  className="px-6 py-2 rounded-xl bg-primary text-black text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:bg-white transition-colors"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default Profile;
