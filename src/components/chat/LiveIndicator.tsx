import React from 'react';

const LiveIndicator: React.FC = () => {
  return (
    <div className="absolute -top-0.5 -right-0.5">
      <div className="relative w-2.5 h-2.5">
        {/* Outer ping animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-[ping_2s_ease-in-out_infinite]" />
        {/* Inner subtle pulse */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-[pulse_2s_ease-in-out_infinite]" />
        {/* Solid dot */}
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm" />
      </div>
    </div>
  );
};

export default LiveIndicator; 