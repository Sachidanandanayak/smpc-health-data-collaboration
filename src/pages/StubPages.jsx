import React from 'react';
import GlassCard from '../components/GlassCard';

const StubPage = ({ title }) => (
  <div>
    <header className="mb-10">
      <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
      <p className="text-gray-400 mt-2">This module is under construction for Phase 3/4.</p>
    </header>
    <GlassCard className="p-12 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-white">Loading {title} Module...</h2>
      <p className="text-gray-400 mt-2">Integrating secure data pipelines.</p>
    </GlassCard>
  </div>
);

export const Notifications = () => <StubPage title="Notifications" />;
export const Profile = () => <StubPage title="Profile Settings" />;
export const Settings = () => <StubPage title="System Settings" />;
