import React from 'react';
import { Settings as SettingsIcon, Shield, Lock, Bell, Moon, Smartphone } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const Toggle = ({ defaultChecked }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
    <div className="w-11 h-6 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-white/10"></div>
  </label>
);

const Settings = () => {
  return (
    <div className="font-sans max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <SettingsIcon className="text-gray-400" /> System Settings
        </h1>
        <p className="text-gray-400 mt-2">Configure platform preferences and security controls.</p>
      </header>

      <div className="space-y-6">
        
        {/* Security Settings */}
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Shield className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-bold text-white">Security & Authentication</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium mb-1">Two-Factor Authentication (2FA)</h4>
                <p className="text-sm text-gray-400">Require a cryptographic token from an authenticator app upon login.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium mb-1">Require VPN for Access</h4>
                <p className="text-sm text-gray-400">Only allow connections from approved institutional IP ranges.</p>
              </div>
              <Toggle defaultChecked={false} />
            </div>

            <div className="pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
                <Lock className="w-4 h-4" /> Change Password
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Preferences */}
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-white">Notifications & Display</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium mb-1">Email Alerts for Computations</h4>
                <p className="text-sm text-gray-400">Receive an email when a federated learning job completes.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium mb-1">Security Alert Push Notifications</h4>
                <p className="text-sm text-gray-400">Send push notifications to connected mobile devices for critical alerts.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="text-white font-medium mb-1">Dark Mode / Cyberpunk Theme</h4>
                  <p className="text-sm text-gray-400">Toggle the Liquid Glass UI aesthetic.</p>
                </div>
              </div>
              <Toggle defaultChecked={true} />
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default Settings;
