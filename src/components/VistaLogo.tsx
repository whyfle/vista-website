import React from 'react';
import vistaLogoAsset from '../assets/images/vista_eye_logo_1788781380045.jpg';

interface VistaLogoProps {
  className?: string;
  size?: number;
}

export const VistaLogo: React.FC<VistaLogoProps> = ({
  className = '',
  size = 32,
}) => {
  return (
    <div
      id="vista-eye-mark"
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden rounded bg-black border border-neutral-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={vistaLogoAsset}
        alt="Vista Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain select-none pointer-events-none"
        loading="eager"
      />
    </div>
  );
};
