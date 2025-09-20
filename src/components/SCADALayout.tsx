import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SCADASidebar } from './SCADASidebar';
import { SCADAHeader } from './SCADAHeader';
import HomePage from '@/pages/HomePage';
import ParametersPage from '@/pages/ParametersPage';
import RecipePage from '@/pages/RecipePage';
import ReportPage from '@/pages/ReportPage';

export const SCADALayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <SCADASidebar />
        
        <div className="flex-1 flex flex-col">
          <SCADAHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/parameters" element={<ParametersPage />} />
              <Route path="/recipe" element={<RecipePage />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};