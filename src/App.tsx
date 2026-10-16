import { useState } from 'react';
import { TabType, Wallpaper } from './types';
import { INITIAL_WALLPAPERS } from './data/wallpapers';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { PreviewModal } from './components/PreviewModal';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { ApplyScreen } from './components/screens/ApplyScreen';
import { UploadScreen } from './components/screens/UploadScreen';
import { VaultScreen } from './components/screens/VaultScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('apply');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(INITIAL_WALLPAPERS);
  const [activeWallpaper, setActiveWallpaper] = useState<Wallpaper>(
    INITIAL_WALLPAPERS.find((w) => w.id === 'glyph-preview-02') || INITIAL_WALLPAPERS[0]
  );
  const [previewModalWallpaper, setPreviewModalWallpaper] = useState<Wallpaper | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleSelectWallpaper = (wp: Wallpaper) => {
    setActiveWallpaper(wp);
    setCurrentTab('apply');
    showToast(`MOUNTED // ${wp.title}`);
  };

  const handleToggleFavorite = (wpId: string) => {
    setWallpapers((prev) =>
      prev.map((item) => {
        if (item.id === wpId) {
          const nextState = !item.isFavorite;
          showToast(nextState ? 'SAVED TO GLYPH VAULT' : 'REMOVED FROM VAULT');
          return { ...item, isFavorite: nextState };
        }
        return item;
      })
    );
  };

  const handleApplyWallpaper = (target: string, wp: Wallpaper) => {
    setWallpapers((prev) =>
      prev.map((item) => {
        if (target === 'LOCK SCREEN' || target === 'LOCKSCREEN') {
          if (item.id === wp.id) return { ...item, vaultStatus: 'active_lock' };
          if (item.vaultStatus === 'active_lock') return { ...item, vaultStatus: 'none' };
        } else if (target === 'HOME SCREEN' || target === 'HOMESCREEN') {
          if (item.id === wp.id) return { ...item, vaultStatus: 'active_home' };
          if (item.vaultStatus === 'active_home') return { ...item, vaultStatus: 'none' };
        } else if (target === 'BOTH SCREENS') {
          if (item.id === wp.id) return { ...item, vaultStatus: 'active_lock' };
        }
        return item;
      })
    );
    showToast(`DEPLOYED TO: ${target}`);
  };

  const handlePublishWallpaper = (newWp: Wallpaper) => {
    setWallpapers((prev) => [newWp, ...prev]);
    setActiveWallpaper(newWp);
    setCurrentTab('vault');
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans flex flex-col relative selection:bg-[#ff5449] selection:text-[#5c0004]">
      {/* Fixed Telemetry Top Header */}
      <Header
        currentTab={currentTab}
        onProfileClick={() => showToast('OPERATOR: ZZUEZ // CLEARANCE LEVEL 05')}
      />

      {/* Main Screen Content Stage */}
      <main className="flex flex-col relative w-full pt-24 pb-28 min-h-screen">
        {currentTab === 'discover' && (
          <DiscoverScreen
            wallpapers={wallpapers}
            onSelectWallpaper={handleSelectWallpaper}
            onPreviewModal={(wp) => setPreviewModalWallpaper(wp)}
            onToggleFavorite={handleToggleFavorite}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'apply' && (
          <ApplyScreen
            activeWallpaper={activeWallpaper}
            onShowToast={showToast}
            onApplyWallpaper={handleApplyWallpaper}
          />
        )}

        {currentTab === 'upload' && (
          <UploadScreen
            onShowToast={showToast}
            onPublishWallpaper={handlePublishWallpaper}
          />
        )}

        {currentTab === 'vault' && (
          <VaultScreen
            wallpapers={wallpapers}
            onSelectWallpaper={handleSelectWallpaper}
            onSetLock={(wp) => handleApplyWallpaper('LOCK SCREEN', wp)}
            onSetHome={(wp) => handleApplyWallpaper('HOME SCREEN', wp)}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToUpload={() => setCurrentTab('upload')}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Quick Preview Modal */}
      <PreviewModal
        wallpaper={previewModalWallpaper}
        isOpen={previewModalWallpaper !== null}
        onClose={() => setPreviewModalWallpaper(null)}
        onApply={(target) => {
          if (previewModalWallpaper) {
            handleApplyWallpaper(target, previewModalWallpaper);
            setPreviewModalWallpaper(null);
          }
        }}
        onOpenInApplyScreen={(wp) => {
          handleSelectWallpaper(wp);
        }}
      />

      {/* Real-time Telemetry Toast */}
      <Toast message={toastMessage} />

      {/* Floating Tactical Bottom Dock */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}
