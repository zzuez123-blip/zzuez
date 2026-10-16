import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-[#353534]/95 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-2">
      <span className="w-2 h-2 rounded-full bg-[#ff5449] shadow-[0_0_8px_rgba(255,84,73,1)] animate-ping"></span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-[#e5e2e1] font-bold">
        {message.startsWith('//') ? message : `// ${message}`}
      </span>
    </div>
  );
};
