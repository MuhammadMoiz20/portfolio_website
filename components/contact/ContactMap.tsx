'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation, FiMinus, FiPlus } from 'react-icons/fi';

interface ContactMapProps {
  /**
   * Latitude for the map center
   */
  latitude: number;
  
  /**
   * Longitude for the map center
   */
  longitude: number;
  
  /**
   * Address text to display below the map
   */
  address?: string;
  
  /**
   * Initial zoom level (1-20)
   * @default 14
   */
  zoom?: number;
  
  /**
   * Map provider
   * @default 'google'
   */
  provider?: 'google' | 'mapbox' | 'osm';
  
  /**
   * Map height in pixels
   * @default 400
   */
  height?: number;
  
  /**
   * Whether to show zoom controls
   * @default true
   */
  showZoomControls?: boolean;
  
  /**
   * Custom marker label
   */
  markerLabel?: string;
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * ContactMap component
 * Displays a map with location marker for contact pages
 */
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
  
  /**
   * Increase zoom level
   */
  const zoomIn = () => {
    setCurrentZoom((prev) => Math.min(prev + 1, 20));
  };
  
  /**
   * Decrease zoom level
   */
  const zoomOut = () => {
    setCurrentZoom((prev) => Math.max(prev - 1, 1));
  };
  
  // Determine map src based on provider
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
  
  // Use a useEffect to simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative rounded-lg shadow-md ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"
        style={{ height: `${height}px` }}
      >
        {/* Loading state */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
        )}
        
        {/* Map Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mapLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          {/* 
            In a real implementation, integrate with actual map provider:
            - For Google Maps, use the Google Maps JavaScript API or react-google-maps
            - For Mapbox, use react-map-gl
            - For OpenStreetMap, use react-leaflet
            
            This is a placeholder implementation using a static image:
          */}
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${getMapSrc()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Marker pin at center */}
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
        
        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          {/* Directions button */}
          <button
            onClick={openDirections}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Get directions"
          >
            <FiNavigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </button>
          
          {/* Zoom controls */}
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
      
      {/* Address */}
      {address && (
        <div className="mt-4 flex items-start space-x-2 text-gray-700 dark:text-gray-300">
          <FiMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <address className="not-italic">
            {address}
          </address>
        </div>
      )}
      
      {/* Note about API keys */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>Note: For a production implementation, replace "YOUR_API_KEY" with your actual API key.</p>
      </div>
    </div>
  );
}
