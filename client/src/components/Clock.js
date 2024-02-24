import React from "react";
import { useTime } from "react-timer-hook";

function Clock() {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  return (
    <div>
      <div className="text-8xl bg-green-400 flex items-center justify-center">
        <div>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          <span>{ampm}</span>
        </div>
      </div>
    </div>
  );
}

export default Clock;
