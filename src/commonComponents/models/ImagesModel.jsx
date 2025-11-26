import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImagesModel({
  images = [],
  open = undefined,
  onClose = undefined,
  initialIndex = 0,
}) {
  const [isOpen, setIsOpen] = useState(Boolean(open ?? false));
  const boundedIndex = (i) => {
    if (!images || images.length === 0) return 0;
    return Math.max(0, Math.min(i, images.length - 1));
  };
  const [index, setIndex] = useState(boundedIndex(initialIndex));
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof open === "boolean") setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setIndex(boundedIndex(initialIndex));
  }, [initialIndex, images.length]);

  useEffect(() => {
    if (isOpen) setLoading(true);
  }, [index, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index, images.length]);

  const handleClose = () => {
    if (typeof open === "boolean") {
      onClose?.();
    } else {
      setIsOpen(false);
      onClose?.();
    }
  };

  const next = () => {
    if (!images || images.length <= 1) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
    setLoading(true);
  };

  const prev = () => {
    if (!images || images.length <= 1) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setLoading(true);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 cursor-pointer bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center w-full h-full max-w-[1200px] max-h-[88vh]"
            >
              <AnimatePresence custom={direction} initial={false} mode="wait">
                {loading && (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-[80vw] h-[52vh] max-w-[95vw] max-h-[80vh] bg-gray-200 rounded-xl animate-pulse"
                  />
                )}

                <motion.img
                  key={`image-${index}-${images[index].url}`}
                  src={images[index].url}
                  onLoad={() => setLoading(false)}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.36 }}
                  className={`w-auto h-auto max-w-[95vw] max-h-[80vh] rounded-lg shadow-2xl object-contain transition-opacity duration-300 ${
                    loading ? "opacity-0" : "opacity-100"
                  }`}
                  alt={`Slide ${index + 1}`}
                />
              </AnimatePresence>

              {/* Prev */}
              {images.length > 1 && (
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute cursor-pointer left-2 sm:left-4 md:-left-12 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold bg-black/30 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
                >
                  ‹
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute cursor-pointer right-2 sm:right-4 md:-right-12 top-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold bg-black/30 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
                >
                  ›
                </button>
              )}

              {/* Close */}
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute top-3 right-3 text-white text-2xl md:text-3xl bg-black/30 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center focus:outline-none"
              >
                ✕
              </button>

              {/* index indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/25 px-3 py-1 rounded">
                {index + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
