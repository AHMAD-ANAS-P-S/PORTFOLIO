import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, EyeOff } from 'lucide-react';

interface LightboxProps {
  images: { src: string; caption: string }[];
  startIndex: number;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);

  // Sync index if prop changes
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black/95 select-none">
        {/* Background Click to Close */}
        <div className="absolute inset-0 z-0" onClick={onClose} />

        {/* Top bar controls */}
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
          <span className="font-mono text-xs text-gray-500">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-cyber-cyan transition-colors"
            id="lightbox-close-btn"
          >
            <X size={24} />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative z-10 w-full max-w-4xl max-h-[85vh] flex justify-center items-center px-12">
          {/* Left Arrow */}
          {hasMultiple && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
              id="lightbox-prev-btn"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Center Image or Placeholder */}
          <div className="w-full max-h-[75vh] flex flex-col items-center justify-center">
            {currentImage.src ? (
              <motion.img
                key={currentImage.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={currentImage.src}
                alt={currentImage.caption}
                className="max-w-full max-h-[70vh] object-contain rounded border border-white/10"
              />
            ) : (
              <div className="cert-placeholder w-full max-w-[500px] aspect-[4/3] flex flex-col items-center justify-center p-6 border-dashed border-2 border-cyber-cyan/50 bg-white/5 rounded-lg">
                <EyeOff size={32} className="text-cyber-cyan/60 mb-3" />
                <span className="font-mono text-cyber-cyan text-sm mb-1 font-semibold uppercase tracking-wider">
                  Certificate coming soon
                </span>
                <span className="font-mono text-[10px] text-gray-500">
                  Not yet uploaded to the project assets
                </span>
              </div>
            )}

            {/* Caption */}
            <div className="mt-6 text-center">
              <p className="font-mono text-sm text-cyber-cyan tracking-wide">
                {currentImage.caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          {hasMultiple && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
              id="lightbox-next-btn"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
export default Lightbox;
