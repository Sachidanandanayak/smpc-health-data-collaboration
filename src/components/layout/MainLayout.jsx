import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FloatingParticles from '../FloatingParticles';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-white flex overflow-hidden">
      <FloatingParticles />
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative z-10 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
