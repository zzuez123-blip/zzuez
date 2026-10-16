import React, { useState } from 'react';
import { ArchiveFilter, Wallpaper } from '../../types';

interface VaultScreenProps {
  wallpapers: Wallpaper[];
  onSelectWallpaper: (wp: Wallpaper) => void;
  onSetLock: (wp: Wallpaper) => void;
  onSetHome: (wp: Wallpaper) => void;
  onToggleFavorite: (wpId: string) => void;
  onNavigateToUpload: () => void;
  onShowToast: (msg: string) => void;
}

export const VaultScreen: React.FC<VaultScreenProps> = ({
  wallpapers,
  onSelectWallpaper,
  onSetLock,
  onSetHome,
  onToggleFavorite,
  onNavigateToUpload,
  onShowToast,
}) => {
  const [rotationActive, setRotationActive] = useState(true);
  const [activeArchiveFilter, setActiveArchiveFilter] = useState<ArchiveFilter>('all');

  // Filter vault wallpapers based on archive tab
  const vaultWallpapers = wallpapers.filter((wp) => {
    if (activeArchiveFilter === 'favorites') {
      return wp.isFavorite;
    }
    if (activeArchiveFilter === 'uploads') {
      return wp.uploadedAt !== undefined || wp.id.startsWith('custom-');
    }
    if (activeArchiveFilter === 'live') {
      return wp.categories.includes('live') || wp.vaultStatus === 'live';
    }
    if (activeArchiveFilter === 'queue') {
      return wp.vaultStatus === 'queue' || wp.queuePos !== undefined;
    }
    return true;
  });

  const favoritesCount = wallpapers.filter((w) => w.isFavorite).length;
  const uploadsCount = wallpapers.filter((w) => w.uploadedAt || w.id.startsWith('custom-')).length;

  return (
    <div className="flex flex-col w-full px-4 pb-12 gap-5 max-w-md mx-auto select-none animate-in fade-in duration-300">
      {/* Telemetry & Device Sync Widget */}
      <section className="flex flex-col w-full rounded-2xl bg-[#201f1f]/80 backdrop-blur-2xl p-4 shadow-xl border border-white/5 relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.8)] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#c6c6cb] uppercase tracking-widest font-bold">
              VAULT TELEMETRY // GLYPH.01
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2a2a2a] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
            <span className="font-mono text-[9px] text-[#e5e2e1] uppercase tracking-wider font-bold">
              SYNC ACTIVE
            </span>
          </div>
        </div>

        {/* Storage Telemetry */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-baseline justify-between text-[#c6c6cb] font-mono">
            <span className="text-[10px] uppercase tracking-wider text-[#e5e2e1] font-bold">
              STORAGE UTILIZATION
            </span>
            <span className="text-[11px] tracking-tight text-[#ffb4ab] font-bold">
              4.8 GB <span className="text-[#c6c6cb]">/ 15.0 GB</span>
            </span>
          </div>

          {/* Segmented Dot Matrix Progress Bar (12 segments) */}
          <div aria-label="Storage Meter" className="grid grid-cols-12 gap-1 py-1">
            <div className="h-2 rounded-full bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.6)]"></div>
            <div className="h-2 rounded-full bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.6)]"></div>
            <div className="h-2 rounded-full bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.6)]"></div>
            <div className="h-2 rounded-full bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.6)]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
            <div className="h-2 rounded-full bg-[#353534]"></div>
          </div>

          <div className="flex justify-between items-center text-[#c6c6cb] font-mono text-[9px] font-bold">
            <span className="uppercase tracking-widest">
              {wallpapers.length + 22} VAULT ASSETS REGISTERED
            </span>
            <span className="uppercase tracking-widest">32% ALLOCATED</span>
          </div>
        </div>

        {/* Paired Hardware Terminal Bar */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1b1b] border border-white/5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 border border-white/5">
              <span className="material-symbols-outlined text-[16px] text-[#e5e2e1]">smartphone</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[11px] font-bold text-[#e5e2e1] truncate">
                NOTHING PHONE (2)
              </span>
              <span className="font-mono text-[9px] text-[#c6c6cb] tracking-widest uppercase font-bold">
                OS 2.5 // N-GLYPH ENGINE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <span className="font-mono text-[9px] text-[#c6c6cb] uppercase tracking-widest font-bold">
              [ONLINE]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] animate-pulse"></span>
          </div>
        </div>
      </section>

      {/* Routine Automation & Schedule Module */}
      <section className="flex flex-col w-full rounded-2xl bg-[#201f1f]/75 backdrop-blur-xl p-4 gap-3 border border-white/5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#ff5449]">autorenew</span>
            <span className="font-mono text-[12px] font-bold text-[#e5e2e1] uppercase tracking-wider">
              ROUTINE AUTOMATION
            </span>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#ff5449]/20 text-[#ffb4ab] uppercase tracking-widest font-bold border border-[#ff5449]/30">
            ACTIVE DAEMON
          </span>
        </div>

        {/* Tactical Toggle Card */}
        <div
          className="flex items-center justify-between p-3 rounded-xl bg-[#2a2a2a]/60 cursor-pointer active:scale-[0.99] transition-transform border border-white/5"
          onClick={() => {
            const next = !rotationActive;
            setRotationActive(next);
            onShowToast(next ? 'DAILY ROTATION DAEMON: ENGAGED' : 'ROTATION DAEMON: PAUSED');
          }}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  rotationActive
                    ? 'bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.8)]'
                    : 'bg-[#c6c6cb]'
                }`}
              ></span>
              <span className="font-mono text-[11px] text-[#e5e2e1] uppercase font-bold">
                DAILY ROTATION ENGINE
              </span>
            </div>
            <span className="font-sans text-[11px] text-[#c6c6cb]">
              Auto-swaps lock screen at astronomical sunrise
            </span>
          </div>

          {/* Tactical Switch Track */}
          <div
            className={`w-11 h-6 rounded-full flex items-center p-0.5 transition-colors duration-200 ${
              rotationActive ? 'bg-[#ff5449]' : 'bg-[#353534]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                rotationActive ? 'translate-x-5 bg-[#5c0004]' : 'translate-x-0 bg-[#e5e2e1]'
              }`}
            ></div>
          </div>
        </div>

        {/* Scheduled Diagnostic Readout */}
        <div className="grid grid-cols-2 gap-2 mt-0.5 font-mono">
          <div className="flex flex-col p-2.5 rounded-xl bg-[#1c1b1b] border border-white/5">
            <span className="text-[9px] text-[#c6c6cb] uppercase tracking-wider font-bold">
              NEXT AUTOMATION
            </span>
            <span className="text-[12px] font-bold text-[#e5e2e1] tracking-wider mt-0.5">
              06:00 AM // SUN
            </span>
            <span className="text-[9px] text-[#ff5449] truncate mt-0.5 font-bold">
              TARGET: AMOLED MINIMAL
            </span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-[#1c1b1b] border border-white/5">
            <span className="text-[9px] text-[#c6c6cb] uppercase tracking-wider font-bold">
              INTERVAL DURATION
            </span>
            <span className="text-[12px] font-bold text-[#e5e2e1] tracking-wider mt-0.5">
              24.00 HOURS
            </span>
            <span className="text-[9px] text-[#c6c6cb] uppercase tracking-wider mt-0.5 font-bold">
              TAGS: [MINIMAL, 4K]
            </span>
          </div>
        </div>
      </section>

      {/* Filter Carousel / Monospaced Vault Tabs */}
      <section className="flex flex-col w-full gap-1">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#c6c6cb] font-bold">
            ARCHIVE SELECTOR
          </span>
          <span className="font-mono text-[9px] text-[#c6c6cb] uppercase tracking-widest font-bold">
            SORT: DATE [DESC]
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-4 px-4 font-mono text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setActiveArchiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm transition-all border ${
              activeArchiveFilter === 'all'
                ? 'bg-[#e5e2e1] text-[#131313] border-white'
                : 'bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
            }`}
          >
            [ALL ({wallpapers.length})]
          </button>

          <button
            type="button"
            onClick={() => setActiveArchiveFilter('uploads')}
            className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeArchiveFilter === 'uploads'
                ? 'bg-[#e5e2e1] text-[#131313] border-white'
                : 'bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
            }`}
          >
            [UPLOADS ({uploadsCount})]
          </button>

          <button
            type="button"
            onClick={() => setActiveArchiveFilter('favorites')}
            className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeArchiveFilter === 'favorites'
                ? 'bg-[#e5e2e1] text-[#131313] border-white'
                : 'bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
            }`}
          >
            [FAVORITES ({favoritesCount})]
          </button>

          <button
            type="button"
            onClick={() => setActiveArchiveFilter('live')}
            className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeArchiveFilter === 'live'
                ? 'bg-[#e5e2e1] text-[#131313] border-white'
                : 'bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
            }`}
          >
            [LIVE LOOPS (6)]
          </button>

          <button
            type="button"
            onClick={() => setActiveArchiveFilter('queue')}
            className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeArchiveFilter === 'queue'
                ? 'bg-[#e5e2e1] text-[#131313] border-white'
                : 'bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
            }`}
          >
            [QUEUE (8)]
          </button>
        </div>
      </section>

      {/* 2-Column Translucent Wallpaper Collection Grid */}
      <section className="grid grid-cols-2 gap-2.5 w-full">
        {vaultWallpapers.map((wp) => {
          const isLockActive = wp.vaultStatus === 'active_lock';
          const isHomeActive = wp.vaultStatus === 'active_home';
          const isLive = wp.vaultStatus === 'live' || wp.format.includes('LIVE');
          const isQueue = wp.vaultStatus === 'queue' || wp.queuePos !== undefined;

          return (
            <div
              key={wp.id}
              className="flex flex-col rounded-2xl bg-[#201f1f]/75 backdrop-blur-xl overflow-hidden group relative border border-white/5 hover:border-white/20 transition-colors shadow-md"
            >
              <div
                className="relative w-full aspect-[9/16] overflow-hidden bg-[#0e0e0e] cursor-pointer"
                onClick={() => onSelectWallpaper(wp)}
              >
                <img
                  src={wp.imageUrl}
                  alt={wp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/95 via-[#0e0e0e]/20 to-transparent"></div>

                {/* Top Status Pip */}
                {isLockActive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff5449] text-[#5c0004] shadow-[0_0_8px_rgba(255,84,73,0.6)] font-mono text-[8px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5c0004] animate-ping"></span>
                    <span className="uppercase tracking-wider">ACTIVE LOCK</span>
                  </div>
                )}

                {isHomeActive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3a3939] text-[#e5e2e1] font-mono text-[8px] font-bold border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]"></span>
                    <span className="uppercase tracking-wider">ACTIVE HOME</span>
                  </div>
                )}

                {isLive && !isLockActive && !isHomeActive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#353534]/90 text-[#e5e2e1] font-mono text-[8px] font-bold border border-white/10">
                    <span className="material-symbols-outlined text-[10px] text-[#ff5449]">motion_play</span>
                    <span className="uppercase tracking-wider">LIVE 60FPS</span>
                  </div>
                )}

                {isQueue && !isLockActive && !isHomeActive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#353534]/90 text-[#c6c6cb] font-mono text-[8px] font-bold border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6c6cb]"></span>
                    <span className="uppercase tracking-wider">QUEUE POS #{wp.queuePos || 3}</span>
                  </div>
                )}

                <button
                  type="button"
                  aria-label="Options menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectWallpaper(wp);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform border border-white/10"
                >
                  <span className="material-symbols-outlined text-[16px]">more_vert</span>
                </button>

                {/* Bottom Spec Matrix */}
                <div className="absolute bottom-2 inset-x-2 flex flex-col gap-0.5">
                  <span className="font-mono text-[12px] text-[#e5e2e1] uppercase tracking-wide truncate font-bold">
                    {wp.title}
                  </span>
                  <div className="flex items-center justify-between text-[#c6c6cb] font-mono text-[9px] uppercase tracking-wider font-bold">
                    <span>{wp.format}</span>
                    <span className="text-[#ff5449] font-bold">{wp.fileWeight}</span>
                  </div>
                </div>
              </div>

              {/* Action Panel Underneath */}
              <div className="flex items-center justify-between p-2 bg-[#1c1b1b] border-t border-white/5 font-mono">
                {isLockActive ? (
                  <button
                    type="button"
                    onClick={() => onSetLock(wp)}
                    className="flex items-center gap-1 text-[9px] text-[#e5e2e1] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#2a2a2a] active:scale-95 transition-transform border border-white/5 font-bold"
                  >
                    <span className="material-symbols-outlined text-[12px] text-[#ff5449]">lock_reset</span>
                    <span>SET LOCK</span>
                  </button>
                ) : isHomeActive ? (
                  <button
                    type="button"
                    onClick={() => onSetHome(wp)}
                    className="flex items-center gap-1 text-[9px] text-[#c6c6cb] hover:text-[#e5e2e1] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#2a2a2a] active:scale-95 transition-transform border border-white/5 font-bold"
                  >
                    <span className="material-symbols-outlined text-[12px]">wallpaper</span>
                    <span>SET HOME</span>
                  </button>
                ) : isLive ? (
                  <button
                    type="button"
                    onClick={() => onShowToast(`QUEUED // ${wp.title}`)}
                    className="flex items-center gap-1 text-[9px] text-[#c6c6cb] hover:text-[#e5e2e1] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#2a2a2a] active:scale-95 transition-transform border border-white/5 font-bold"
                  >
                    <span className="material-symbols-outlined text-[12px]">playlist_add</span>
                    <span>QUEUE</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectWallpaper(wp)}
                    className="flex items-center gap-1 text-[9px] text-[#c6c6cb] hover:text-[#e5e2e1] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#2a2a2a] active:scale-95 transition-transform border border-white/5 font-bold"
                  >
                    <span className="material-symbols-outlined text-[12px]">tune</span>
                    <span>EDIT</span>
                  </button>
                )}

                <button
                  type="button"
                  aria-label="Toggle Favorite"
                  onClick={() => onToggleFavorite(wp.id)}
                  className="p-1 text-[#c6c6cb] hover:text-[#ff5449] transition-colors"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      wp.isFavorite ? 'text-[#ff5449] fill-1' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick Floating Action Strip: BATCH INGEST // NEW UPLOAD */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="button"
          onClick={onNavigateToUpload}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#e5e2e1] text-[#131313] hover:bg-white active:scale-95 transition-all shadow-[0_4px_24px_rgba(255,255,255,0.15)] group font-mono font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ff5449] group-hover:rotate-90 transition-transform">
            add_circle
          </span>
          <span className="text-[11px] uppercase tracking-widest">BATCH INGEST // NEW UPLOAD</span>
        </button>
      </div>
    </div>
  );
};
