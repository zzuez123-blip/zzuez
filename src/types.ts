export type TabType = 'discover' | 'apply' | 'upload' | 'vault';

export type ScreenMode = 'lock' | 'home' | 'aod';

export interface Wallpaper {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  imageUrl: string;
  format: string; // e.g. "16-BIT RAW", "4K UHD", "SVG LIVE", "RAW 60FPS", "AMOLED 100%"
  dimensions: string; // e.g. "1440 × 3120 PX" or "3840x2160"
  profile: string; // e.g. "DCI-P3 10-BIT", "sRGB", "Rec.2020"
  fileWeight: string; // e.g. "18.4 MB (RAW)", "14.2 MB"
  glyphSync: string; // e.g. "LINKED // ZONE_04"
  pixelDensity?: string; // e.g. "528 PPI"
  pulls?: string; // e.g. "14.2K"
  badgeText?: string; // e.g. "DAILY GLYPH // 01", "ARCH // 09"
  palette: string[]; // 5 hex colors
  categories: Array<'all' | 'amoled' | 'matrix' | 'minimal' | 'generative' | 'live'>;
  isFavorite?: boolean;
  isDaily?: boolean;
  vaultStatus?: 'active_lock' | 'active_home' | 'live' | 'queue' | 'none';
  queuePos?: number;
  uploadedAt?: string;
}

export type FilterCategory = 'all' | 'amoled' | 'matrix' | 'minimal' | 'generative' | 'live';
export type ArchiveFilter = 'all' | 'uploads' | 'favorites' | 'live' | 'queue';
export type AspectRatio = '20:9 native' | 'ultrawide' | 'dynamic';
export type ColorProfile = 'dci-p3 wide' | 'srgb std' | 'rec.2020 hdr';
