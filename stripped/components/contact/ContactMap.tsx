'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation, FiMinus, FiPlus } from 'react-icons/fi';

interface ContactMapProps {
    latitude: number;
  
    longitude: number;
  
    address?: string;
  
    zoom?: number;
  
    provider?: 'google' | 'mapbox' | 'osm';
  
    height?: number;
  
    showZoomControls?: boolean;
  
    markerLabel?: string;
  
    className?: string;
}

export default function ContactMap({
  latitude,
  longitude,
  address,
  zoom = 14,
  provider = 'google',
  height = 400,
  showZoomControls = true,
  markerLabel,
  className = '',
}: ContactMapProps) {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  /**
   * Open directions in the appropriate maps application
   */
  const openDirections = () => {
    // Google Maps URL format for directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };
  
    const zoomIn = () => {
    setCurrentZoom((prev) => Math.min(prev + 1, 20));
  };
  
    const zoomOut = () => {
    setCurrentZoom((prev) => Math.max(prev - 1, 1));
  };
  
  
  const getMapSrc = () => {
    switch (provider) {
      case 'mapbox':
        return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+f43f5e(${longitude},${latitude})/${longitude},${latitude},${currentZoom},0/600x${height}?access_token=YOUR_MAPBOX_TOKEN`;
      
      case 'osm':
        return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${currentZoom}&size=600x${height}&markers=${latitude},${longitude},red`;
      
      case 'google':
      default:
        return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${currentZoom}&size=600x${height}&markers=color:red%7C${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
    }
  };
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative rounded-lg shadow-md ${className}`}>
      {}
      <div 
        ref={mapRef}
        className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
        style={{ height: `${height}px` }}
      >
        {}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
        )}
        
        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mapLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          {}
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${getMapSrc()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="flex flex-col items-center">
              {markerLabel && (
                <div className="mb-1 rounded-lg bg-white px-2 py-1 text-sm font-medium shadow-md dark:bg-gray-800">
                  {markerLabel}
                </div>
              )}
              <FiMapPin className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </motion.div>
        
        {}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          {}
          <button
            onClick={openDirections}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Get directions"
          >
            <FiNavigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </button>
          
          {}
          {showZoomControls && (
            <>
              <button
                onClick={zoomIn}
                disabled={currentZoom >= 20}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Zoom in"
              >
                <FiPlus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button
                onClick={zoomOut}
                disabled={currentZoom <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <FiMinus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {}
      {address && (
        <div className="mt-4 flex items-start space-x-2 text-gray-700 dark:text-gray-300">
          <FiMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <address className="not-italic">
            {address}
          </address>
        </div>
      )}
      
      {}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>Note: For a production implementation, replace "YOUR_API_KEY" with your actual API key.</p>
      </div>
    </div>
  );
}
