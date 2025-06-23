import React from "react";

const LiveIndicator: React.FC = () => {
  return (
    <div className="absolute -top-0.5 -right-0.5" data-oid="umgs_r:">
      <div className="relative w-2.5 h-2.5" data-oid="ckutg4j">
        {/* Outer ping animation */}
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-[ping_2s_ease-in-out_infinite]"
          data-oid="ni3j1.u"
        />

        {/* Inner subtle pulse */}
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-[pulse_2s_ease-in-out_infinite]"
          data-oid="5jdou_1"
        />

        {/* Solid dot */}
        <span
          className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm"
          data-oid="bi0286c"
        />
      </div>
    </div>
  );
};

export default LiveIndicator;
