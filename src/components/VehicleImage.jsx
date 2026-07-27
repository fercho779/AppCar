import { useState } from 'react';

function PlaceholderIcon({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 35h70M20 35c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zm60 0c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zM25 35V25l10-5h20l15 10v5M30 20h25"
        stroke="#d0d0d0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Muestra la foto real del vehículo (vehicle.imagenUrl) si existe y carga bien;
// si no hay imagen o falla la carga, cae automáticamente al ícono de línea
// que ya usaba la app, para que nunca se vea un ícono roto.
export function VehicleImage({ src, alt, iconSize = { width: 100, height: 60 }, className = '' }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {showPlaceholder ? (
        <PlaceholderIcon width={iconSize.width} height={iconSize.height} />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}