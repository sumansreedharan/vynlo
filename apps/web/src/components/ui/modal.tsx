"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  // Listen for the Escape key to close the modal naturally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling when modal is active
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay with premium transition blur */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose} 
      />

      {/* Modal Box Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-6 backdrop-blur-xl shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200 md:p-8">
        
        {/* Subtle top interior light reflection effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

        {/* Premium Floating Close Action Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-500 transition duration-150 hover:bg-zinc-800 hover:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        >
          <X size={16} />
        </button>

        {/* Modal Injectable Context Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}