"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlForImage } from "@/sanity/lib/image";

interface GalleryProps {
  images: any[];
  serviceName: string;
}

export function Gallery({ images, serviceName }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="img-zoom group relative aspect-[4/3] rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-colors cursor-pointer bg-card"
          >
            <img
              src={urlForImage(image)?.width(600).height(450).url() || ""}
              alt={`${serviceName} — Imagem ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              >
                <path
                  d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
          <DialogTitle className="sr-only">
            {serviceName} — Imagem {selectedIndex !== null ? selectedIndex + 1 : ""}
          </DialogTitle>
          {selectedIndex !== null && (
            <div className="relative">
              <img
                src={urlForImage(images[selectedIndex])?.width(1200).url() || ""}
                alt={`${serviceName} — Imagem ${selectedIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-2 hover:bg-background transition-colors cursor-pointer"
                aria-label="Imagem anterior"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12 5l-5 5 5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-2 hover:bg-background transition-colors cursor-pointer"
                aria-label="Próxima imagem"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1 text-xs text-muted-foreground">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
