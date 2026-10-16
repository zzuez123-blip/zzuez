import React, { useState } from 'react';
import { FilterCategory, Wallpaper } from '../../types';

interface DiscoverScreenProps {
  wallpapers: Wallpaper[];
  onSelectWallpaper: (wp: Wallpaper) => void;
  onPreviewModal: (wp: Wallpaper) => void;
  onToggleFavorite: (wpId: string) => void;
  onShowToast: (msg: string) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  wallpapers,
  onSelectWallpaper,
  onPreviewModal,
  onToggleFavorite,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolutionFilter, setResolutionFilter] = useState<'all' | '4k'>('all');

  // Filter wallpapers
  const filteredWallpapers = wallpapers.filter((wp) => {
    if (activeCategory !== 'all' && !wp.categories.includes(activeCategory)) {
      return false;
    }
    if (resolutionFilter === '4k' && !wp.format.includes('4K') && !wp.format.includes('RAW')) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        wp.title.toLowerCase().includes(q) ||
        wp.subtitle.toLowerCase().includes(q) ||
        wp.format.toLowerCase().includes(q) ||
        (wp.description && wp.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Featured wallpaper (Kinetic Core)
  const featured = wallpapers.find((w) => w.isDaily) || wallpapers[0];

  return (
    <div className="flex flex-col w-full px-4 space-y-4 pb-12 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Telemetry Calibration Status Banner */}
      <div className="w-full rounded-2xl bg-[#2a2a2a]/60 backdrop-blur-md p-2 flex items-center justify-between shadow-sm border border-white/5">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.9)] animate-pulse shrink-0"></div>
          <span className="font-mono text-[10px] text-[#c6c6cb] truncate tracking-widest uppercase font-bold">
            CALIBRATED: <span className="text-[#e5e2e1]">10-BIT OLED OPTIMIZED</span> // 120HZ
          </span>
        </div>
        <div className="flex items-center space-x-1 shrink-0 pl-1 font-mono text-[9px] text-[#ffb4ab] font-bold">
          <span className="material-symbols-outlined text-[14px]">tune</span>
          <span className="tracking-widest">99.4% RAW</span>
        </div>
      </div>

      {/* Search & Telemetry Input Sub-bar */}
      <div className="w-full flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#c6c6cb] text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH_TELEMETRY.RAW..."
            className="w-full h-11 pl-10 pr-12 rounded-full bg-[#0e0e0e]/80 text-[#e5e2e1] font-mono text-[11px] placeholder:text-[#46464b] focus:outline-none focus:bg-[#1c1b1b] transition-colors shadow-inner border border-white/5"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#c6c6cb] hover:text-[#e5e2e1] font-mono text-[9px] uppercase tracking-wider font-bold"
            >
              [CLR]
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            const next = resolutionFilter === 'all' ? '4k' : 'all';
            setResolutionFilter(next);
            onShowToast(next === '4k' ? 'FILTER: 4K / RAW PROFILES ONLY' : 'FILTER: ALL RESOLUTIONS');
          }}
          className={`h-11 px-3.5 rounded-full flex items-center gap-1.5 shrink-0 shadow-sm transition-all active:scale-95 border ${
            resolutionFilter === '4k'
              ? 'bg-[#e5e2e1] text-[#131313] border-white'
              : 'bg-[#0e0e0e]/80 text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
          }`}
        >
          <span className={`material-symbols-outlined text-[16px] ${resolutionFilter === '4k' ? 'text-[#ff5449]' : 'text-[#ff5449]'}`}>
            filter_list
          </span>
          <span className="font-mono text-[10px] tracking-widest font-bold">4K UHD</span>
        </button>
      </div>

      {/* Filter Pills Horizontal Scroller */}
      <div className="w-full -mx-4 px-4 overflow-x-auto flex items-center gap-2 no-scrollbar py-0.5">
        {[
          { id: 'all', label: 'ALL [84]' },
          { id: 'amoled', label: 'AMOLED DEEP' },
          { id: 'matrix', label: 'GLYPH MATRIX' },
          { id: 'minimal', label: 'MINIMAL RAW' },
          { id: 'generative', label: 'GENERATIVE' },
          { id: 'live', label: 'LIVE 120HZ' },
        ].map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCategory(item.id as FilterCategory);
                onShowToast(`FILTER // ${item.label}`);
              }}
              className={`shrink-0 h-8 px-3.5 rounded-full flex items-center gap-1.5 transition-all shadow-sm font-mono text-[10px] uppercase tracking-wider font-bold border ${
                isActive
                  ? 'bg-[#e5e2e1] text-[#131313] border-white'
                  : 'bg-[#0e0e0e]/70 text-[#c6c6cb] hover:text-[#e5e2e1] border-white/5'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive
                    ? 'bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.8)]'
                    : 'bg-[#353534]'
                }`}
              ></span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Daily Glyph Card */}
      {featured && (
        <section className="w-full relative rounded-3xl overflow-hidden bg-[#0e0e0e] shadow-2xl flex flex-col border border-white/10 group">
          {/* Visual Image / Wallpaper Display */}
          <div className="relative w-full h-80 overflow-hidden">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Smoked Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>

            {/* Top Overlay Micro Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 bg-[#0e0e0e]/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,1)] animate-pulse"></span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e5e2e1] font-bold">
                  {featured.badgeText || 'DAILY GLYPH // 01'}
                </span>
              </div>
              <div className="bg-[#0e0e0e]/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#c6c6cb] font-bold">
                  3840x2160 // DCI-P3
                </span>
              </div>
            </div>

            {/* Favorite Floating Pip */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(featured.id);
              }}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#353534]/80 backdrop-blur-xl flex items-center justify-center text-[#e5e2e1] hover:text-[#ff5449] active:scale-90 transition-all shadow-md border border-white/10 cursor-pointer"
              aria-label="Save Daily Wallpaper"
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform ${
                  featured.isFavorite ? 'text-[#ff5449] fill-1' : ''
                }`}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Featured Meta & Action Footer */}
          <div className="p-4 pt-2 flex flex-col space-y-3 bg-[#0e0e0e]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <h2 className="font-mono text-[18px] tracking-wider text-[#e5e2e1] uppercase truncate font-bold">
                    {featured.title}
                  </h2>
                  <span className="px-1.5 py-0.5 rounded bg-[#2a2a2a] font-mono text-[9px] text-[#ffb4ab] font-bold border border-white/5">
                    RAW
                  </span>
                </div>
                <p className="font-sans text-[12px] text-[#c6c6cb] truncate mt-0.5">
                  {featured.description}
                </p>
              </div>
            </div>

            {/* Telemetry Data Strip */}
            <div className="grid grid-cols-3 gap-2 py-2 bg-[#1c1b1b]/80 rounded-xl px-3 border border-white/5 font-mono">
              <div className="flex flex-col">
                <span className="text-[8px] text-[#c6c6cb] tracking-widest uppercase font-bold">FORMAT</span>
                <span className="text-[10px] text-[#e5e2e1] uppercase font-bold">{featured.format}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] text-[#c6c6cb] tracking-widest uppercase font-bold">PIXEL DENSITY</span>
                <span className="text-[10px] text-[#e5e2e1] uppercase font-bold">{featured.pixelDensity || '528 PPI'}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[8px] text-[#c6c6cb] tracking-widest uppercase font-bold">PULLS</span>
                <span className="text-[10px] text-[#ff5449] uppercase font-bold">{featured.pulls || '14.2K'}</span>
              </div>
            </div>

            {/* Primary Action */}
            <button
              type="button"
              onClick={() => onSelectWallpaper(featured)}
              className="w-full h-12 rounded-full bg-[#e5e2e1] text-[#131313] flex items-center justify-center space-x-2 font-mono text-[13px] tracking-widest uppercase hover:bg-white transition-all active:scale-[0.98] shadow-lg shadow-black/40 font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">wallpaper</span>
              <span>PREVIEW &amp; APPLY</span>
              <span className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.9)] ml-1"></span>
            </button>
          </div>
        </section>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between pt-2 pb-1">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-3.5 rounded-full bg-[#ff5449]"></div>
          <h3 className="font-mono text-[14px] uppercase tracking-wider text-[#e5e2e1] font-bold">
            CURATED TELEMETRY
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#c6c6cb] uppercase tracking-widest font-bold">
          FEED // VOL. 04
        </span>
      </div>

      {/* 2-Column Curated Grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full pb-4">
        {filteredWallpapers
          .filter((w) => !w.isDaily)
          .map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-[#0e0e0e] flex flex-col shadow-md border border-white/5 hover:border-white/20 transition-colors"
            >
              <div
                className="relative w-full aspect-[9/16] overflow-hidden cursor-pointer"
                onClick={() => onPreviewModal(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/40"></div>

                {/* Top Format Chip */}
                <div className="absolute top-2 left-2 flex items-center space-x-1 bg-[#0e0e0e]/80 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/5 font-mono text-[8px] font-bold">
                  {item.format.includes('LIVE') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] animate-pulse"></span>
                  )}
                  <span className="text-[#ffb4ab] tracking-widest uppercase">{item.format}</span>
                </div>

                {/* Heart Favorite */}
                <button
                  type="button"
                  aria-label={`Save ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#353534]/70 backdrop-blur-md flex items-center justify-center text-[#e5e2e1] hover:text-[#ff5449] active:scale-90 transition-all border border-white/10"
                >
                  <span
                    className={`material-symbols-outlined text-[15px] ${
                      item.isFavorite ? 'text-[#ff5449] fill-1' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>

                {/* Bottom Info In Scrim */}
                <div className="absolute bottom-2 inset-x-2 flex flex-col min-w-0">
                  <span className="font-mono text-[8px] text-[#c6c6cb] tracking-widest uppercase font-bold">
                    {item.subtitle}
                  </span>
                  <span className="font-mono text-[12px] leading-tight text-[#e5e2e1] uppercase truncate font-bold">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-2 flex items-center justify-between bg-[#0e0e0e]">
                <span className="font-mono text-[9px] text-[#c6c6cb] truncate font-bold">
                  {item.profile} // {item.fileWeight}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectWallpaper(item)}
                  className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] hover:bg-[#e5e2e1] hover:text-[#131313] transition-colors border border-white/5 shrink-0"
                  title="Preview in Hardware Simulator"
                >
                  <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
