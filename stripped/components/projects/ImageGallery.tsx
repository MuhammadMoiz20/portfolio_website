'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface GalleryImage {
    id: string | number;
  
    src: string;
  
    alt: string;
  
    caption?: string;
}

interface ImageGalleryProps {
    images: GalleryImage[];
  
    columns?: 2 | 3 | 4;
  
    gap?: string;
  
    lightbox?: boolean;
}

export default function ImageGallery({
  images,
  columns = 3,
  gap = 'gap-4',
  lightbox = true,
}: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
    const openLightbox = useCallback((index: number) => {
    if (lightbox) {
      setSelectedImageIndex(index);
      
      document.body.style.overflow = 'hidden';
    }
  }, [lightbox]);
  
    const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    
    document.body.style.overflow = 'auto';
  }, []);
  
    const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  }, [selectedImageIndex, images.length]);
  
    const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  }, [selectedImageIndex, images.length]);
  
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    switch (e.key) {
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'Escape':
        closeLightbox();
        break;
      default:
        break;
    }
  }, [selectedImageIndex, nextImage, prevImage, closeLightbox]);

  
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <>
      {}
      <div className={`grid ${gridCols[columns]} ${gap}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
            role={lightbox ? 'button' : undefined}
            tabIndex={lightbox ? 0 : undefined}
            aria-label={lightbox ? `View ${image.alt}` : undefined}
          >
            <div className="aspect-w-16 aspect-h-12 relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {}
              {lightbox && (
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30" />
              )}
            </div>
            
            {}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {}
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <FiX size={24} />
            </button>
            
            {}
            <button
              className="absolute left-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <button
              className="absolute right-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <FiChevronRight size={24} />
            </button>
            
            {}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative h-full max-h-[90vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full items-center justify-center">
                <Image
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              
              {}
              {images[selectedImageIndex].caption && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  <p className="mx-auto max-w-2xl rounded bg-black bg-opacity-50 p-2 text-sm">
                    {images[selectedImageIndex].caption}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
