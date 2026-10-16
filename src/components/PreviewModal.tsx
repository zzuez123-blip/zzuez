import React from 'react';
import { Wallpaper } from '../types';

interface PreviewModalProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (type: 'LOCKSCREEN' | 'HOMESCREEN' | 'BOTH SCREENS') => void;
  onOpenInApplyScreen: (wallpaper: Wallpaper) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  wallpaper,
  isOpen,
  onClose,
  onApply,
  onOpenInApplyScreen,
}) => {
  if (!isOpen || !wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col justify-end p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-auto bg-[#1c1b1b] border border-white/10 rounded-3xl p-4 flex flex-col gap-4 shadow-2xl relative">
        {/* Drag pill indicator */}
        <div className="w-12 h-1 rounded-full bg-[#353534] mx-auto cursor-pointer" onClick={onClose}></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#c6c6cb] tracking-widest uppercase font-bold">
              TELEMETRY PREVIEW
            </span>
            <span className="font-mono text-[16px] font-bold text-[#e5e2e1] uppercase truncate max-w-[280px]">
              {wallpaper.title}
            </span>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] hover:bg-[#353534] transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Device Frame Preview Simulation */}
        <div className="relative w-full h-52 rounded-2xl bg-[#0e0e0e] overflow-hidden flex items-center justify-center border border-white/5">
          <img
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center justify-center p-4 gap-2 text-center">
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a]/90 backdrop-blur-md flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[20px]">screen_lock_portrait</span>
            </div>
            <span className="font-mono text-[15px] font-bold text-[#e5e2e1] uppercase tracking-wider">
              HARDWARE SIMULATION READY
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#353534]/90 backdrop-blur-md font-mono text-[9px] text-[#c6c6cb] uppercase tracking-wider">
                {wallpaper.format} // {wallpaper.dimensions}
              </span>
            </div>
          </div>
        </div>

        {/* Deep Dive Option: Open directly in Apply simulator */}
        <button
          type="button"
          onClick={() => {
            onOpenInApplyScreen(wallpaper);
            onClose();
          }}
          className="w-full py-2 px-3 rounded-full bg-[#2a2a2a] text-[#e5e2e1] hover:bg-[#353534] font-mono text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border border-white/5"
        >
          <span className="material-symbols-outlined text-[16px] text-[#ff5449]">phone_android</span>
          <span>OPEN HARDWARE SIMULATOR (LOCK / HOME / AOD)</span>
        </button>

        {/* Action Stack */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 h-11 rounded-full bg-[#2a2a2a] hover:bg-[#353534] text-[#e5e2e1] font-mono text-[10px] tracking-widest uppercase transition-all border border-white/5 active:scale-95"
            onClick={() => onApply('LOCKSCREEN')}
          >
            SET LOCKSCREEN
          </button>
          <button
            type="button"
            className="flex-1 h-11 rounded-full bg-[#e5e2e1] text-[#131313] hover:bg-[#ffffff] font-mono text-[10px] tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            onClick={() => onApply('BOTH SCREENS')}
          >
            <span>APPLY BOTH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.8)]"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
