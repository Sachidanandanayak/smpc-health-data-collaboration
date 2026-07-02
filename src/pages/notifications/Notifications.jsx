import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ShieldAlert, Cpu, Database, UserPlus, CheckCircle2 } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const notificationsData = [
  { id: 1, type: 'security', title: 'Unauthorized Access Blocked', desc: 'Multiple failed login attempts from IP 45.22.19.88 were blocked.', time: '10 mins ago', unread: true },
  { id: 2, type: 'computation', title: 'SMPC Pipeline Completed', desc: 'Federated ResNet-50 training has successfully converged at Epoch 70.', time: '1 hour ago', unread: true },
  { id: 3, type: 'dataset', title: 'New Dataset Available', desc: 'Stanford Medicine has uploaded "Neurology MRI Scans".', time: '3 hours ago', unread: false },
  { id: 4, type: 'user', title: 'New Researcher Registration', desc: 'Dr. Emily Chen has requested access to the Global Aggregator node.', time: '5 hours ago', unread: false },
  { id: 5, type: 'system', title: 'Node Maintenance Scheduled', desc: 'Node-Beta will undergo cryptographic key rotation tonight at 02:00 AM.', time: '1 day ago', unread: false },
];

const getIcon = (type) => {
  switch(type) {
    case 'security': return <ShieldAlert className="w-5 h-5 text-red-400" />;
    case 'computation': return <Cpu className="w-5 h-5 text-accent" />;
    case 'dataset': return <Database className="w-5 h-5 text-secondary" />;
    case 'user': return <UserPlus className="w-5 h-5 text-green-400" />;
    default: return <Bell className="w-5 h-5 text-gray-400" />;
  }
};

const Notifications = () => {
  return (
    <div className="font-sans max-w-4xl mx-auto">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Bell className="text-yellow-400" /> Notifications
          </h1>
          <p className="text-gray-400 mt-2">Real-time alerts and system updates.</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <CheckCircle2 className="w-4 h-4" /> Mark all as read
        </button>
      </header>

      <GlassCard className="p-2">
        <div className="divide-y divide-white/5">
          {notificationsData.map((notif, i) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 flex items-start gap-4 transition-colors hover:bg-white/5 ${notif.unread ? 'bg-white/5' : ''}`}
            >
              <div className={`p-3 rounded-full border ${notif.unread ? 'bg-black/40 border-white/10' : 'bg-transparent border-transparent'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold ${notif.unread ? 'text-white' : 'text-gray-300'}`}>{notif.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className={`text-sm ${notif.unread ? 'text-gray-300' : 'text-gray-500'}`}>{notif.desc}</p>
              </div>
              {notif.unread && (
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,245,255,0.8)] mt-2" />
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Notifications;
