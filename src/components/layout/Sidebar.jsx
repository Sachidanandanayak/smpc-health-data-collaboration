import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Database, Cpu, BrainCircuit, BarChart3, ShieldAlert, Bell, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Hospitals', path: '/hospitals', icon: Building2 },
    { name: 'Datasets', path: '/datasets', icon: Database },
    { name: 'Computation', path: '/computation', icon: Cpu },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Audit Logs', path: '/audit-logs', icon: ShieldAlert },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const bottomItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Logout', path: '/login', icon: LogOut }, // Redirects to login for mock logout
  ];

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/10 flex flex-col z-40 rounded-none rounded-r-[32px]">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.4)]">
          <ShieldAlert className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          MediSecure
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu</div>
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} className={navClass}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 space-y-2 border-t border-white/5">
        {bottomItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            onClick={() => {
              if (item.name === 'Logout') {
                localStorage.removeItem('isAuthenticated');
              }
            }}
            className={navClass}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
