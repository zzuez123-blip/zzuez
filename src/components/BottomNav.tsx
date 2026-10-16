import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe px-4 mb-3 pointer-events-none">
      <div className="pointer-events-auto max-w-md mx-auto h-16 rounded-full bg-[#0e0e0e]/90 backdrop-blur-2xl shadow-[0_4px_28px_rgba(0,0,0,0.85)] border border-white/10 flex items-center justify-around px-2">
        {/* DISC */}
        <button
          type="button"
          onClick={() => onTabChange('discover')}
          className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-full transition-all duration-200 ${
            currentTab === 'discover'
              ? 'bg-[#353534] text-[#e5e2e1] shadow-[0_0_14px_rgba(255,84,73,0.35)]'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
          aria-label="Discover Wallpapers"
        >
          <span className="material-symbols-outlined text-[20px]">explore</span>
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold">DISC</span>
        </button>

        {/* APPLY */}
        <button
          type="button"
          onClick={() => onTabChange('apply')}
          className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-full transition-all duration-200 ${
            currentTab === 'apply'
              ? 'bg-[#353534] text-[#e5e2e1] shadow-[0_0_14px_rgba(255,84,73,0.35)]'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
          aria-label="Apply Wallpaper"
        >
          <span className="material-symbols-outlined text-[20px]">wallpaper</span>
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold">APPLY</span>
        </button>

        {/* UPLOAD / (+) CENTER CTA */}
        <button
          type="button"
          onClick={() => onTabChange('upload')}
          className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-full transition-all duration-200 relative ${
            currentTab === 'upload'
              ? 'bg-[#353534] text-[#e5e2e1] shadow-[0_0_14px_rgba(255,84,73,0.35)]'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
          aria-label="Upload Studio"
        >
          <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-[0_0_12px_rgba(255,84,73,0.3)] active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[22px] text-[#ff5449]">add</span>
          </div>
        </button>

        {/* VAULT */}
        <button
          type="button"
          onClick={() => onTabChange('vault')}
          className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-full transition-all duration-200 ${
            currentTab === 'vault'
              ? 'bg-[#353534] text-[#e5e2e1] shadow-[0_0_14px_rgba(255,84,73,0.35)]'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
          aria-label="Glyph Vault"
        >
          <span className="material-symbols-outlined text-[20px]">folder_zip</span>
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold">VAULT</span>
        </button>
      </div>
    </nav>
  );
};
