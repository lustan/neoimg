import React, { useRef, useState } from 'react';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (validTypes.includes(file.type)) {
      onFileSelect(file);
    } else {
      alert('仅支持 JPEG, PNG, WEBP, SVG, GIF 图片');
    }
  };

  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`
        relative w-full max-w-3xl min-h-[24rem] rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden
        flex flex-col items-center justify-center px-8 py-12 backdrop-blur-3xl
        ${isDragging
          ? 'border-cyan-300/70 bg-white/15 shadow-[0_0_120px_rgba(45,212,191,0.22)] scale-[1.015]'
          : 'border-white/25 bg-white/[0.08] shadow-[0_20px_90px_rgba(8,47,73,0.45)] hover:border-cyan-200/50 hover:bg-white/[0.1] hover:-translate-y-1'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerInput}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
      />

      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/20"></div>
      <div className="pointer-events-none absolute -inset-1 rounded-[2.8rem] bg-gradient-to-r from-cyan-300/20 via-white/5 to-teal-300/20 blur-xl"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_36%),radial-gradient(circle_at_80%_75%,rgba(45,212,191,0.16),transparent_40%)]"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-white/10 shadow-[0_0_60px_rgba(34,211,238,0.35)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">拖放你的图片</h3>
        <p className="mt-3 text-sm md:text-base text-white/75">拖拽上传或点击选择 · 全程本地隐私处理</p>

        <button
          type="button"
          className="mt-8 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs uppercase tracking-[0.28em] font-semibold text-white transition-all hover:bg-white/20"
        >
          选择文件
        </button>
      </div>
    </div>
  );
};

export default DropZone;
