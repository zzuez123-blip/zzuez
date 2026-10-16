import React, { useState, useRef } from 'react';
import { AspectRatio, ColorProfile, Wallpaper } from '../../types';

interface UploadScreenProps {
  onShowToast: (msg: string) => void;
  onPublishWallpaper: (newWp: Wallpaper) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  onShowToast,
  onPublishWallpaper,
}) => {
  const [amoledFilter, setAmoledFilter] = useState(true);
  const [watermark, setWatermark] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('20:9 native');
  const [colorProfile, setColorProfile] = useState<ColorProfile>('dci-p3 wide');

  // Ingestion state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(78);
  const [currentFileName, setCurrentFileName] = useState('NEBULA_GLYPH_RAW_09.DNG');
  const [previewImage, setPreviewImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDi9fD3Q8M9kACqRinW2--dOOS5T9HmS_vJtnvA_qeEIae3ccvr0klyGsqTkt9vhd8qnHGJVKumYKPSE5KN6uQsiZncUdNL1SF37kCa0D5MaY7WmsI0-KGL1bge0b_kuMhXe3p3zIu5ys5xemBSUV6-PqwZOiadDWPz9JZPP3qPyyttk2LTPptBwD-PZXF9-q1LqqZgf3JUHgS5ZDx4rUN83pMEJ4-SMos39XabcWJ_AOp2uGKW9Ky-zg'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setCurrentFileName(file.name.toUpperCase().replace(/\s+/g, '_'));
    setIsUploading(true);
    setUploadProgress(15);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
        onShowToast(`INGESTING // ${file.name.toUpperCase()}`);
      }
    };
    reader.readAsDataURL(file);

    // Simulate upload telemetry progress
    let p = 15;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 18) + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsUploading(false);
        onShowToast('OPTICAL INGEST COMPLETE // DCI-P3 CALIBRATED');
      }
      setUploadProgress(p);
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmPublish = () => {
    const newWallpaper: Wallpaper = {
      id: `custom-${Date.now()}`,
      title: currentFileName.replace(/\.[^/.]+$/, ''),
      subtitle: 'STUDIO // INGEST',
      description: 'Lossless multi-format calibrated telemetry asset published via Upload Studio.',
      imageUrl: previewImage,
      format: 'RAW DNG',
      dimensions: '3840 × 2160 PX',
      profile: colorProfile.toUpperCase(),
      fileWeight: '48.2 MB',
      glyphSync: 'LINKED // ZONE_01',
      pixelDensity: '528 PPI',
      pulls: '1',
      badgeText: 'STUDIO RAW',
      palette: ['#050505', '#1a1a1a', '#333333', '#ffffff', '#ff5449'],
      categories: ['all', 'generative', 'minimal'],
      vaultStatus: 'none',
      uploadedAt: 'JUST NOW',
    };

    onPublishWallpaper(newWallpaper);
    onShowToast(`PUBLISHED TO VAULT // ${newWallpaper.title}`);
  };

  const handleCancel = () => {
    setUploadProgress(0);
    onShowToast('INGESTION BUFFER PURGED');
  };

  return (
    <div className="flex flex-col w-full px-4 gap-5 pb-10 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Studio Header Telemetry Banner */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5449] shadow-[0_0_10px_rgba(255,84,73,0.9)] animate-ping"></span>
            <h1 className="font-mono text-[20px] font-bold uppercase tracking-wider text-[#e5e2e1]">
              UPLOAD_STUDIO // V2.4
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#c6c6cb] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449]"></span>
            <span className="font-mono text-[10px] tracking-widest text-[#e5e2e1] font-bold">REC.RDY</span>
          </div>
        </div>
        <p className="font-sans text-[12px] text-[#c6c6cb] leading-relaxed">
          Lossless multi-format ingestion engine with automatic AMOLED &amp; HDR color grading telemetry.
        </p>
      </div>

      {/* Interactive Drag & Drop Intake Module */}
      <div
        className="relative group cursor-pointer overflow-hidden rounded-3xl bg-[#1c1b1b] p-6 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 active:scale-[0.99] border border-white/5 hover:border-white/20"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />

        {/* Ambient Blueprint Grid Layer */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"></div>

        {/* Telemetry Corner Markers */}
        <div className="absolute top-3 left-3 text-[#c6c6cb]/40 font-mono text-[9px] tracking-widest pointer-events-none font-bold">
          [CORNER_01:TL]
        </div>
        <div className="absolute top-3 right-3 text-[#c6c6cb]/40 font-mono text-[9px] tracking-widest pointer-events-none font-bold">
          [SYS:STANDBY]
        </div>
        <div className="absolute bottom-3 left-3 text-[#c6c6cb]/40 font-mono text-[9px] tracking-widest pointer-events-none font-bold">
          [INGEST:CH-01]
        </div>
        <div className="absolute bottom-3 right-3 text-[#c6c6cb]/40 font-mono text-[9px] tracking-widest pointer-events-none font-bold">
          [OPTICAL:RAW]
        </div>

        {/* Center Glyph Pulsing Focal Assembly */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-[#ff5449]/10 blur-xl animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center shadow-inner border border-white/10">
            <div className="w-14 h-14 rounded-full bg-[#353534] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ff5449] text-[28px] transition-transform duration-300 group-hover:-translate-y-0.5">
                cloud_upload
              </span>
            </div>
          </div>
          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.9)]"></span>
        </div>

        {/* Intake Prompt */}
        <div className="flex flex-col gap-1 z-10">
          <span className="font-mono text-[14px] font-bold uppercase tracking-widest text-[#e5e2e1]">
            TAP OR DROP FILES TO INGEST
          </span>
          <span className="font-mono text-[10px] text-[#c6c6cb] uppercase tracking-widest font-bold">
            OPTICAL BUFFER WAITING FOR INPUT STREAM
          </span>
        </div>

        {/* Monospace Supported Formats Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-sm z-10 font-mono">
          {['[RAW / DNG]', '[HEIC / HEIF]', '[PNG 16-BIT]', '[WEBP HD]', '[MP4 / LIVE]', '[SVG VECTOR]'].map(
            (fmt, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-[#353534] text-[#c6c6cb] text-[9px] uppercase tracking-wider font-bold border border-white/5"
              >
                {fmt}
              </span>
            )
          )}
        </div>

        {/* Lossless Payload Limit Pill */}
        <div className="mt-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#353534]/80 border border-white/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449] animate-pulse"></span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#e8bcb7] font-bold">
              UP TO 100MB LOSSLESS PER ASSET
            </span>
          </div>
        </div>
      </div>

      {/* Ingestion Telemetry Pipeline Settings */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] text-[#c6c6cb] uppercase tracking-widest font-bold">
            CALIBRATION ENGINE // PARAMETERS
          </span>
          <span className="font-mono text-[9px] text-[#ff5449] tracking-widest font-bold">REALTIME AUTO-MAP</span>
        </div>

        {/* Card 1: AMOLED True Black Filter */}
        <div className="rounded-2xl bg-[#1c1b1b] p-3.5 flex items-center justify-between shadow-sm border border-white/5">
          <div className="flex items-start gap-3 pr-2 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
              <span className="material-symbols-outlined text-[#ff5449] text-[18px]">contrast</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[12px] uppercase tracking-wide text-[#e5e2e1] font-bold truncate">
                AMOLED TRUE BLACK FILTER
              </span>
              <span className="font-sans text-[11px] text-[#c6c6cb] leading-snug">
                Automatically clamps #000000 pixels to 0 nits to preserve OLED battery &amp; contrast.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !amoledFilter;
              setAmoledFilter(next);
              onShowToast(next ? 'AMOLED TRUE BLACK: 0 NITS CLAMP' : 'AMOLED FILTER BYPASSED');
            }}
            className={`relative shrink-0 w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ${
              amoledFilter ? 'bg-[#ff5449]' : 'bg-[#2a2a2a]'
            }`}
            aria-label="Toggle AMOLED Filter"
          >
            <span
              className={`block w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                amoledFilter ? 'translate-x-6 bg-[#e5e2e1]' : 'translate-x-0 bg-[#c6c6cb]'
              }`}
            ></span>
          </button>
        </div>

        {/* Card 2: Glyph Telemetry Watermark */}
        <div className="rounded-2xl bg-[#1c1b1b] p-3.5 flex items-center justify-between shadow-sm border border-white/5">
          <div className="flex items-start gap-3 pr-2 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
              <span className="material-symbols-outlined text-[#c6c6cb] text-[18px]">fingerprint</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[12px] uppercase tracking-wide text-[#e5e2e1] font-bold truncate">
                GLYPH TELEMETRY WATERMARK
              </span>
              <span className="font-sans text-[11px] text-[#c6c6cb] leading-snug">
                Subtle lower corner dot-matrix GPS timestamp &amp; camera lens signature.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !watermark;
              setWatermark(next);
              onShowToast(next ? 'TELEMETRY WATERMARK: ATTACHED' : 'WATERMARK STRIPPED');
            }}
            className={`relative shrink-0 w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ${
              watermark ? 'bg-[#ff5449]' : 'bg-[#2a2a2a]'
            }`}
            aria-label="Toggle Watermark"
          >
            <span
              className={`block w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                watermark ? 'translate-x-6 bg-[#e5e2e1]' : 'translate-x-0 bg-[#c6c6cb]'
              }`}
            ></span>
          </button>
        </div>

        {/* Card 3: Target Aspect Ratio */}
        <div className="rounded-2xl bg-[#1c1b1b] p-3.5 flex flex-col gap-2 shadow-sm border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c6c6cb] text-[18px]">aspect_ratio</span>
              <span className="font-mono text-[12px] uppercase tracking-wide text-[#e5e2e1] font-bold">
                TARGET ASPECT RATIO
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#c6c6cb] tracking-widest font-bold">[AUTO-FIT]</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-[#2a2a2a]">
            {(['20:9 native', 'ultrawide', 'dynamic'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => {
                  setAspectRatio(ratio);
                  onShowToast(`ASPECT: ${ratio.toUpperCase()}`);
                }}
                className={`py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold text-center transition-all ${
                  aspectRatio === ratio
                    ? 'bg-[#e5e2e1] text-[#131313] shadow-sm'
                    : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
                }`}
              >
                {ratio.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Card 4: Color Profile Selector */}
        <div className="rounded-2xl bg-[#1c1b1b] p-3.5 flex flex-col gap-2 shadow-sm border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c6c6cb] text-[18px]">palette</span>
              <span className="font-mono text-[12px] uppercase tracking-wide text-[#e5e2e1] font-bold">
                COLOR PROFILE
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#ff5449] tracking-widest font-bold">[CALIBRATED]</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-[#2a2a2a]">
            {(['dci-p3 wide', 'srgb std', 'rec.2020 hdr'] as ColorProfile[]).map((prof) => (
              <button
                key={prof}
                type="button"
                onClick={() => {
                  setColorProfile(prof);
                  onShowToast(`PROFILE: ${prof.toUpperCase()}`);
                }}
                className={`py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase font-bold text-center transition-all ${
                  colorProfile === prof
                    ? 'bg-[#e5e2e1] text-[#131313] shadow-sm'
                    : 'text-[#c6c6cb] hover:text-[#e5e2e1]'
                }`}
              >
                {prof.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Ingestion Progress Telemetry Unit */}
      <div className="relative overflow-hidden rounded-3xl bg-[#201f1f] p-4 flex flex-col gap-3 shadow-xl border border-white/5">
        {/* Top Metadata Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,0.9)] animate-pulse shrink-0"></span>
            <span className="font-mono text-[11px] text-[#e5e2e1] uppercase tracking-wider font-bold truncate">
              {currentFileName}
            </span>
          </div>
          <span className="font-mono text-[15px] font-bold text-[#ffb4ab] shrink-0 ml-2">
            {uploadProgress}%
          </span>
        </div>

        {/* Lossless Ingest Visual Preview Strip */}
        <div className="relative w-full h-24 rounded-2xl overflow-hidden bg-[#353534] flex items-center justify-center shadow-inner border border-white/5">
          <img
            src={previewImage}
            alt="Ingestion stream preview"
            className="w-full h-full object-cover opacity-80 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#201f1f]/85 via-transparent to-[#201f1f]/85"></div>

          {/* Telemetry Scan Overlay Graphic */}
          <div className="absolute inset-x-0 h-0.5 bg-[#ff5449] shadow-[0_0_12px_rgba(255,84,73,1)] top-1/2 -translate-y-1/2 animate-pulse"></div>

          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5449]"></span>
            <span className="font-mono text-[9px] text-[#e5e2e1] tracking-widest font-bold">LUT: MONO_P3_SAT</span>
          </div>

          <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md font-mono text-[9px] text-[#c6c6cb] tracking-widest font-bold border border-white/5">
            48.2 MB / 61.8 MB
          </div>
        </div>

        {/* Hardware Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="relative w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden">
            <div
              className="h-full bg-[#e5e2e1] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[#c6c6cb] font-mono text-[10px] tracking-wider pt-0.5 font-bold">
            <span className="truncate">SPEED: 24.8 MB/S // 3840×2160</span>
            <span className="text-[#ff5449] shrink-0 uppercase tracking-widest">DCI-P3 VERIFIED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-3 rounded-full bg-[#2a2a2a] text-[#e5e2e1] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] text-center hover:bg-[#353534] border border-white/5"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleConfirmPublish}
            className="w-full py-3 rounded-full bg-[#ff5449] text-[#5c0004] text-[11px] uppercase tracking-wider font-bold shadow-[0_0_14px_rgba(255,84,73,0.45)] transition-all duration-200 active:scale-[0.98] text-center flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>CONFIRM &amp; PUBLISH</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
