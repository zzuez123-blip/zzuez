import React, { useState } from 'react';
import { ScreenMode, Wallpaper } from '../../types';

interface ApplyScreenProps {
  activeWallpaper: Wallpaper;
  onShowToast: (msg: string) => void;
  onApplyWallpaper: (target: string, wp: Wallpaper) => void;
}

export const ApplyScreen: React.FC<ApplyScreenProps> = ({
  activeWallpaper,
  onShowToast,
  onApplyWallpaper,
}) => {
  const [screenMode, setScreenMode] = useState<ScreenMode>('lock');
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [colorBoost, setColorBoost] = useState(false);
  const [showApplyMenu, setShowApplyMenu] = useState(false);

  const handleDownload = () => {
    // Create download link for the wallpaper asset
    const link = document.createElement('a');
    link.href = activeWallpaper.imageUrl;
    link.download = `${activeWallpaper.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_raw.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`LOSSLESS ASSET CACHED // ${activeWallpaper.fileWeight}`);
  };

  const handleCommitApply = (target: string) => {
    setShowApplyMenu(false);
    onApplyWallpaper(target, activeWallpaper);
  };

  const toggleColorBoost = () => {
    const next = !colorBoost;
    setColorBoost(next);
    if (next) {
      onShowToast('COLOR CALIBRATION: VIVID HDR BOOST');
    } else {
      onShowToast('COLOR CALIBRATION: NATURAL D65');
    }
  };

  // Compute filter style for simulation phone
  const getWallpaperStyle = () => {
    let filter = '';
    let transform = 'scale(1)';

    if (screenMode === 'lock') {
      filter = 'brightness(1) contrast(1)';
      transform = 'scale(1)';
    } else if (screenMode === 'home') {
      filter = 'brightness(0.85) blur(1px)';
      transform = 'scale(1.03)';
    } else if (screenMode === 'aod') {
      filter = 'brightness(0.18) grayscale(1)';
      transform = 'scale(1)';
    }

    if (colorBoost) {
      filter += ' contrast(1.2) saturate(1.3)';
    }

    return {
      filter: filter.trim(),
      transform,
    };
  };

  return (
    <div className="flex flex-col w-full px-4 pb-10 gap-5 max-w-md mx-auto select-none animate-in fade-in duration-300">
      {/* Telemetry Bar & Quick Nav */}
      <div className="flex items-center justify-between text-[#c6c6cb] font-mono text-[10px] pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5449] animate-ping"></span>
          <span className="text-[#e5e2e1] uppercase tracking-widest font-mono text-[12px] font-bold truncate max-w-[200px]">
            {activeWallpaper.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#2a2a2a] px-3 py-1 rounded-full text-[#c6c6cb] border border-white/5">
          <span className="material-symbols-outlined text-[14px] text-[#ff5449]">tune</span>
          <span className="text-[10px] tracking-widest font-mono text-[#e5e2e1] font-bold">
            SYS.CALIBRATED
          </span>
        </div>
      </div>

      {/* Segmented Screen Mode Switcher */}
      <div className="w-full bg-[#0e0e0e] p-1 rounded-full flex items-center justify-between shadow-inner border border-white/5">
        <button
          type="button"
          onClick={() => setScreenMode('lock')}
          className={`flex-1 py-2 rounded-full font-mono text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            screenMode === 'lock'
              ? 'bg-[#3a3939] text-[#e5e2e1] shadow-sm'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              screenMode === 'lock' ? 'bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.8)]' : 'bg-transparent'
            }`}
          ></span>
          <span>LOCK</span>
        </button>

        <button
          type="button"
          onClick={() => setScreenMode('home')}
          className={`flex-1 py-2 rounded-full font-mono text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            screenMode === 'home'
              ? 'bg-[#3a3939] text-[#e5e2e1] shadow-sm'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              screenMode === 'home' ? 'bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.8)]' : 'bg-transparent'
            }`}
          ></span>
          <span>HOME</span>
        </button>

        <button
          type="button"
          onClick={() => setScreenMode('aod')}
          className={`flex-1 py-2 rounded-full font-mono text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            screenMode === 'aod'
              ? 'bg-[#3a3939] text-[#e5e2e1] shadow-sm'
              : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              screenMode === 'aod' ? 'bg-[#ff5449] shadow-[0_0_6px_rgba(255,84,73,0.8)]' : 'bg-transparent'
            }`}
          ></span>
          <span>AOD</span>
        </button>
      </div>

      {/* Interactive Phone Hardware Simulation Stage */}
      <div className="relative w-full mx-auto max-w-sm aspect-[9/18.5] rounded-3xl p-3 bg-[#0e0e0e] shadow-[0_12px_44px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden border border-[#2a2a2a]/60">
        {/* Inner Phone Screen Canvas */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between p-4 transition-all duration-500 bg-[#131313]">
          {/* Wallpaper Background Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url('${activeWallpaper.imageUrl}')`,
              ...getWallpaperStyle(),
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80"></div>
          </div>

          {/* 1. LOCKSCREEN OVERLAY */}
          {screenMode === 'lock' && (
            <div className="relative z-10 flex flex-col justify-between h-full transition-opacity duration-300">
              {/* Top Status & Clock */}
              <div className="flex flex-col items-center pt-2 gap-1 text-center">
                <div className="flex items-center gap-1.5 text-[#c6c6cb] font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#0e0e0e]/70 backdrop-blur-md border border-white/5">
                  <span className="material-symbols-outlined text-[13px] text-[#ffb4ab]">lock</span>
                  <span className="tracking-widest font-bold">ENCRYPTED</span>
                </div>

                {/* Dot Matrix Clock Simulation */}
                <div className="flex items-baseline justify-center tracking-tighter text-[#e5e2e1] select-none pt-1">
                  <span className="font-mono text-[42px] font-bold tracking-tight drop-shadow-md">10</span>
                  <span className="font-mono text-[42px] font-bold text-[#ff5449] animate-pulse mx-1">:</span>
                  <span className="font-mono text-[42px] font-bold tracking-tight drop-shadow-md">42</span>
                </div>

                {/* Weather & Date Capsule */}
                <div className="flex items-center gap-2 text-[#c6c6cb] font-mono text-[10px] font-bold">
                  <span className="text-[#e5e2e1]">TUE 24 OCT</span>
                  <span className="text-[#46464b]">//</span>
                  <div className="flex items-center gap-1 text-[#e5e2e1]">
                    <span className="material-symbols-outlined text-[15px] text-[#ff5449]">filter_drama</span>
                    <span>19°C GLYPH</span>
                  </div>
                </div>
              </div>

              {/* Lockscreen Middle Widgets Grid */}
              <div className="flex flex-col gap-2 my-auto px-1">
                {/* Translucent Media Capsule */}
                <div className="w-full bg-[#0e0e0e]/75 backdrop-blur-xl p-2.5 rounded-xl flex items-center justify-between shadow-sm border border-white/5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#ff5449] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,84,73,0.5)]">
                      <span className={`material-symbols-outlined text-[#5c0004] text-[18px] ${isPlayingMusic ? 'animate-pulse' : ''}`}>
                        graphic_eq
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffb4ab] font-bold truncate">
                        NOW PLAYING
                      </span>
                      <span className="font-mono text-[13px] text-[#e5e2e1] font-bold truncate">
                        Kavinsky // Nightcall
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="w-7 h-7 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform"
                      aria-label={isPlayingMusic ? 'Pause Music' : 'Play Music'}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {isPlayingMusic ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Circular Metric Widgets Row */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Widget 1: Battery Matrix */}
                  <div className="bg-[#0e0e0e]/70 backdrop-blur-xl p-2 rounded-xl flex items-center gap-2 border border-white/5">
                    <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#46464b] stroke-current"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="3"
                        />
                        <path
                          className="text-[#ff5449] stroke-current"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeDasharray="86, 100"
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute font-mono text-[9px] text-[#e5e2e1] font-bold">86</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-[#c6c6cb] tracking-widest font-bold">PWR.LEVEL</span>
                      <span className="font-mono text-[10px] text-[#e5e2e1] font-bold">OPTIMAL</span>
                    </div>
                  </div>

                  {/* Widget 2: Step Counter */}
                  <div className="bg-[#0e0e0e]/70 backdrop-blur-xl p-2 rounded-xl flex items-center gap-2 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-[#e5e2e1]">directions_walk</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-[#c6c6cb] tracking-widest font-bold">PEDOMETER</span>
                      <span className="font-mono text-[10px] text-[#e5e2e1] font-bold">8,412 ST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lockscreen Bottom Actions & Swipe Bar */}
              <div className="flex flex-col gap-3 pb-1">
                <div className="flex items-center justify-between px-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFlashlightOn(!flashlightOn);
                      onShowToast(flashlightOn ? 'TORCH DEACTIVATED' : 'TORCH ACTIVATED // GLYPH LED');
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all ${
                      flashlightOn
                        ? 'bg-[#e5e2e1] text-[#131313] shadow-[0_0_16px_rgba(255,255,255,0.7)]'
                        : 'bg-[#0e0e0e]/80 backdrop-blur-md text-[#e5e2e1] border border-white/10'
                    }`}
                    aria-label="Flashlight"
                  >
                    <span className="material-symbols-outlined text-[18px]">flashlight_on</span>
                  </button>

                  <div className="flex items-center gap-1 font-mono text-[9px] text-[#c6c6cb] uppercase tracking-widest font-bold">
                    <span className="material-symbols-outlined text-[13px] text-[#ff5449] animate-bounce">
                      keyboard_arrow_up
                    </span>
                    <span>SWIPE UP</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onShowToast('CAMERA STREAM READY')}
                    className="w-10 h-10 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md flex items-center justify-center text-[#e5e2e1] shadow-md active:scale-95 transition-transform border border-white/10"
                    aria-label="Camera"
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                </div>
                {/* Swipe Pill Indicator */}
                <div className="w-24 h-1 bg-[#353534] rounded-full mx-auto"></div>
              </div>
            </div>
          )}

          {/* 2. HOMESCREEN OVERLAY */}
          {screenMode === 'home' && (
            <div className="relative z-10 flex flex-col justify-between h-full transition-opacity duration-300">
              {/* Top App Matrix & Search */}
              <div className="flex flex-col gap-3 pt-2">
                {/* Minimal Search Bar */}
                <div className="w-full bg-[#0e0e0e]/85 backdrop-blur-xl px-3 py-2 rounded-full flex items-center justify-between text-[#c6c6cb] border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">search</span>
                    <span className="font-mono text-[10px] text-[#c6c6cb] font-bold">SEARCH GLYPH OS...</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#c6c6cb]">mic</span>
                </div>

                {/* Glyph System Icon Grid */}
                <div className="grid grid-cols-4 gap-3 pt-2 px-1 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-md border border-white/5 active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[20px] text-[#e5e2e1]">call</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#c6c6cb] tracking-wider font-bold">DIAL</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-md border border-white/5 active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[20px] text-[#e5e2e1]">chat_bubble</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#c6c6cb] tracking-wider font-bold">MSGS</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-md border border-white/5 active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[20px] text-[#e5e2e1]">camera</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#c6c6cb] tracking-wider font-bold">CAM</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-[#ff5449] flex items-center justify-center shadow-[0_0_12px_rgba(255,84,73,0.5)] active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[20px] text-[#5c0004]">grain</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#ff5449] tracking-wider font-bold">GLYPH</span>
                  </div>
                </div>
              </div>

              {/* Homescreen Bottom Dock */}
              <div className="flex flex-col gap-3 pb-1">
                <div className="bg-[#0e0e0e]/85 backdrop-blur-xl p-2 rounded-2xl flex items-center justify-around border border-white/10 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">public</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">folder</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                  </div>
                </div>
                <div className="w-24 h-1 bg-[#353534] rounded-full mx-auto"></div>
              </div>
            </div>
          )}

          {/* 3. AOD (ALWAYS ON DISPLAY) OVERLAY */}
          {screenMode === 'aod' && (
            <div className="relative z-10 flex flex-col justify-between h-full transition-opacity duration-300">
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0e0e0e]/80 text-[#c6c6cb] border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] animate-pulse"></span>
                  <span className="font-mono text-[9px] tracking-widest font-bold">AOD ACTIVE // 1HZ</span>
                </div>

                {/* Stippled Monospace Big Clock */}
                <div className="flex items-baseline justify-center tracking-tight text-[#c6c6cb]/90">
                  <span className="font-mono text-[42px] font-bold opacity-80">10</span>
                  <span className="font-mono text-[42px] font-bold text-[#ff5449] animate-pulse mx-1">:</span>
                  <span className="font-mono text-[42px] font-bold opacity-80">42</span>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <span className="font-mono text-[10px] text-[#c6c6cb] tracking-widest font-bold">
                    TUE 24 OCT // 86%
                  </span>
                  <div className="flex items-center gap-3 pt-2 text-[#c6c6cb]">
                    <span className="material-symbols-outlined text-[16px]">notifications_none</span>
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span className="material-symbols-outlined text-[16px] text-[#ff5449]">priority_high</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Technical Telemetry Spec Panel */}
      <div className="w-full bg-[#1c1b1b] rounded-2xl p-4 flex flex-col gap-3 border border-white/5 shadow-md">
        {/* Panel Monospace Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449]"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e2e1] font-bold">
              TELEMETRY DIAGNOSTICS
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#c6c6cb] font-bold">[SPEC // REV.03]</span>
        </div>

        {/* Monospace Spec Matrix Grid */}
        <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
          <div className="bg-[#201f1f] p-2.5 rounded-xl flex flex-col gap-0.5 border border-white/5">
            <span className="text-[#c6c6cb] text-[9px] tracking-wider uppercase font-bold">DIMENSIONS</span>
            <span className="text-[#e5e2e1] font-mono text-[13px] font-bold">{activeWallpaper.dimensions}</span>
          </div>

          <div className="bg-[#201f1f] p-2.5 rounded-xl flex flex-col gap-0.5 border border-white/5">
            <span className="text-[#c6c6cb] text-[9px] tracking-wider uppercase font-bold">PROFILE</span>
            <span className="text-[#e5e2e1] font-mono text-[13px] font-bold">{activeWallpaper.profile}</span>
          </div>

          <div className="bg-[#201f1f] p-2.5 rounded-xl flex flex-col gap-0.5 border border-white/5">
            <span className="text-[#c6c6cb] text-[9px] tracking-wider uppercase font-bold">FILE WEIGHT</span>
            <span className="text-[#e5e2e1] font-mono text-[13px] font-bold">{activeWallpaper.fileWeight}</span>
          </div>

          <div className="bg-[#201f1f] p-2.5 rounded-xl flex flex-col gap-0.5 border border-white/5">
            <span className="text-[#c6c6cb] text-[9px] tracking-wider uppercase font-bold">GLYPH SYNC</span>
            <span className="text-[#ff5449] font-mono text-[13px] font-bold">{activeWallpaper.glyphSync}</span>
          </div>
        </div>

        {/* Palette Extract Swatches */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-[#c6c6cb] font-mono text-[10px]">
            <span className="tracking-widest uppercase font-bold">EXTRACTED SYSTEM PALETTE</span>
            <span className="text-[#e5e2e1] font-bold">5 ADAPTIVE TOKENS</span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {activeWallpaper.palette.map((hex, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-full aspect-square rounded-full shadow-sm border border-white/10 ${
                    hex.toLowerCase() === '#ff5449' ? 'shadow-[0_0_8px_rgba(255,84,73,0.5)] ring-1 ring-[#ff5449]' : ''
                  }`}
                  style={{ backgroundColor: hex }}
                ></div>
                <span className="font-mono text-[9px] text-[#c6c6cb] font-bold uppercase">{hex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Set Wallpaper Action Dock & Popover Tray */}
      <div className="relative flex flex-col gap-2">
        {/* Popover Target Destination Selector */}
        {showApplyMenu && (
          <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#2a2a2a] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between px-1 py-0.5 text-[#c6c6cb] font-mono text-[10px] font-bold">
              <span className="tracking-widest uppercase">SELECT TARGET SURFACE</span>
              <button
                type="button"
                className="text-[#e5e2e1] hover:text-[#ff5449]"
                onClick={() => setShowApplyMenu(false)}
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] font-bold">
              <button
                type="button"
                className="bg-[#201f1f] p-2.5 rounded-xl text-[#e5e2e1] hover:bg-[#353534] flex flex-col items-center gap-1 border border-white/5 active:scale-95 transition-all"
                onClick={() => handleCommitApply('LOCK SCREEN')}
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb4ab]">lock</span>
                <span>LOCK ONLY</span>
              </button>

              <button
                type="button"
                className="bg-[#201f1f] p-2.5 rounded-xl text-[#e5e2e1] hover:bg-[#353534] flex flex-col items-center gap-1 border border-white/5 active:scale-95 transition-all"
                onClick={() => handleCommitApply('HOME SCREEN')}
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb4ab]">grid_view</span>
                <span>HOME ONLY</span>
              </button>

              <button
                type="button"
                className="bg-[#ff5449] p-2.5 rounded-xl text-[#5c0004] font-bold flex flex-col items-center gap-1 shadow-[0_0_12px_rgba(255,84,73,0.4)] active:scale-95 transition-all"
                onClick={() => handleCommitApply('BOTH SCREENS')}
              >
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>BOTH</span>
              </button>
            </div>
          </div>
        )}

        {/* Main CTA Bar */}
        <div className="flex items-center gap-2">
          {/* Secondary Action: Download Lossless RAW */}
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-[#2a2a2a] hover:bg-[#353534] text-[#e5e2e1] flex items-center justify-center active:scale-95 transition-transform border border-white/5 shrink-0"
            onClick={handleDownload}
            title="Download Lossless Raw Asset"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>

          {/* Primary High-Contrast Pill CTA: Apply Wallpaper */}
          <button
            type="button"
            className="flex-1 h-12 rounded-full bg-[#ff5449] text-[#5c0004] font-mono text-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,84,73,0.4)] active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => setShowApplyMenu(!showApplyMenu)}
          >
            <span className="material-symbols-outlined text-[20px]">wallpaper</span>
            <span className="tracking-wider uppercase">APPLY WALLPAPER</span>
          </button>

          {/* Secondary Action: Calibrate Display */}
          <button
            type="button"
            className={`w-12 h-12 rounded-full bg-[#2a2a2a] hover:bg-[#353534] flex items-center justify-center active:scale-95 transition-transform border border-white/5 shrink-0 ${
              colorBoost ? 'text-[#ff5449] shadow-[0_0_10px_rgba(255,84,73,0.3)]' : 'text-[#e5e2e1]'
            }`}
            onClick={toggleColorBoost}
            title="Calibrate Display (Natural vs Vivid HDR Boost)"
          >
            <span className="material-symbols-outlined text-[20px]">palette</span>
          </button>
        </div>
      </div>
    </div>
  );
};
