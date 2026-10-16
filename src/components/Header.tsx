import React, { useState, useEffect } from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onProfileClick }) => {
  const [timeStr, setTimeStr] = useState('10:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const getScreenTitle = () => {
    switch (currentTab) {
      case 'discover':
        return 'Discover';
      case 'apply':
        return 'Apply';
      case 'upload':
        return 'Upload';
      case 'vault':
        return 'Vault';
      default:
        return 'System';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#131313]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] border-b border-[#2a2a2a]/40 pt-safe">
      <div className="h-20 px-4 max-w-2xl mx-auto flex flex-col justify-center gap-1">
        {/* Telemetry Status Line */}
        <div className="flex items-center justify-between text-[#c6c6cb] text-[10px] font-mono tracking-widest font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] animate-pulse shadow-[0_0_6px_rgba(255,84,73,0.8)]"></span>
            <span>{timeStr} // SYS.OK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="tracking-widest text-[#c6c6cb]/80">5G.DOTS [::::]</span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#2a2a2a]">
              <div className="w-3 h-1.5 rounded-sm bg-[#ffb4ab]"></div>
              <span className="text-[9px] font-mono leading-none text-[#e5e2e1]">98%</span>
            </div>
          </div>
        </div>

        {/* Brand & Identity Line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              alt="GLYPH Wallpaper Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WmTjtb7_sxPTr0bg7I4_RElZeA91cANEaxuR2tai_dRbmabRmlNRThhgYq_2yU6fZQNwJZ96op0sTAtnB8kN2wTgPJbWj4-hzOnAwC1r7zcLIsoTXBcsG5lNsELZG_41pEEdc1seBkNrX7h8VlkicdRacitz8-do03RK27VhTNRnGC_QMNOySK1eu11MfPVANbIdP_Hxvu0CdIfG0zV3syomJr2dxby-kxIHnlgk7BHkMWmebvssvZSafB"
            />
            <div className="flex flex-col">
              <span className="font-mono text-[16px] font-bold uppercase tracking-wider text-[#e5e2e1] leading-tight">
                GLYPH // {getScreenTitle()}
              </span>
              <span className="font-mono text-[10px] text-[#c6c6cb] uppercase tracking-widest font-bold">
                OS.02 // MATRIX
              </span>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            onClick={onProfileClick}
            title="GLYPH Operator Profile"
          >
            <div className="p-0.5 rounded-full bg-[#353534] border border-[#ff5449]/30">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4MXvyB-YNBJzc3eK908FIh0fqyuxWyXoQyhu6XuVD1DdNcpqmc3w8a3-8KMi3Nf-FjtnD5xcIJv4gasP9hxNr7Td9a7KdwQhWpSO9h-awqmG56LAnl2TZKV2mWAARYy4RBPagdrawvHc-VHi_fnn-DQ4N4l3-bhM72vjMCbwJG984iye8yXgaAgtLvBlnnnFkhfg0k75pgDb3uOJJS_8dI9onuY-1qyP1vGHW5vrC7MWtjlab8MsKdw"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.9)] animate-pulse"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
