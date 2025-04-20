import React from "react";

interface BallMarkerProps {
  position: {
    x: number;
    y: number;
  };
}

const BallMarker: React.FC<BallMarkerProps> = ({ position }) => {
  return (
    <div
      className="absolute w-6 h-6 rounded-full bg-white border-2 border-red-500 transform -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className="h-full w-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></div>
    </div>
  );
};

export default BallMarker;
