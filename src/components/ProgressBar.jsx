/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { selectionStore } from "../store/UISelectionStore";
import { observer } from "mobx-react";

const ProgressBar = observer(({ title, value, onChange }) => {
  const values = Array.from({ length: 11 }, (_, i) => i / 10);
  const [selectedIndex, setSelectedIndex] = useState(Math.round(value * 10));
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Sync selectedIndex with value prop
  useEffect(() => {
    setSelectedIndex(Math.round(value * 10));
  }, [value]);

  // Handle value change
  const handleValueChange = (index) => {
    if (index < 0 || index >= values.length) return; // Ensure index is within bounds
    setSelectedIndex(index);
    onChange(values[index]); // Notify parent of the new value
  };

  // Decrease value
  const decreaseValue = () => {
    handleValueChange(selectedIndex - 1);
  };

  // Increase value
  const increaseValue = () => {
    handleValueChange(selectedIndex + 1);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newIndex = Math.round(
      (clickPosition / rect.width) * (values.length - 1)
    );
    handleValueChange(newIndex);
  };

  return (
    <div className="flex gap-1  my-6 duration-300  w-[450px]">
      <div
        className={`ext-md text-[14px] text-start w-1/4 m-auto cursor-pointer mr-1 ${
          selectionStore.isDarkTheme ? "" : "text-black"
        }`}
      >
        {title}
      </div>
      <div className="flex flex-col items-center w-80 m-auto flex-grow gap-4 px-2 ">
        <div
          className="relative flex items-center w-full max-w-lg"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute left-0 right-0 h-1 bg-gray-500 rounded-full" />

          <div
            className="absolute h-1 bg-[#A673FF] rounded-full transition-all duration-300"
            style={{
              width: `${(selectedIndex / (values.length - 1)) * 100}%`,
            }}
          />

          {/* Value Indicators */}
          {values.map((value, index) => (
            <div key={index} className="relative flex items-center w-full">
              {/* Clickable Area Between Indicators */}
              {index > 0 && (
                <div
                  className="absolute h-1 cursor-pointer transition bg-transparent hover:bg-[#A673FF]/50"
                  style={{ left: "0%", width: "50%" }}
                  onClick={() => handleValueChange(index)}
                />
              )}

              {/* Indicator Dots */}
              {index % 2 === 0 && (
                <button
                  className={`w-3 h-3 rounded-full transition bg-[#A673FF]`}
                  onClick={() => handleValueChange(index)}
                />
              )}

              {/* Active Value Indicator */}
              {index === selectedIndex && (
                <div
                  className="absolute -translate-x-1/2 text-sm text-[#A673FF] font-semibold transition-all duration-300 z-10"
                  style={{
                    left: `${(index / (values.length - 1)) * 100}%`,
                  }}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  <div className="relative flex items-center rounded-full transition-all duration-300">
                    {/* Decrease Button */}
                    {showControls && (
                      <button
                        className="text-[#A673FF] font-bold border p-1 rounded-full border-[#A673FF] bg-white mx-1 cursor-pointer"
                        onClick={decreaseValue}
                        aria-label="Decrease value"
                      >
                        ➖
                      </button>
                    )}

                    {/* Active Value Display */}
                    <span
                      className="border border-[#A673FF] px-4 py-1 rounded-full bg-[#4c0080] relative z-10 hover:bg-white transition cursor-pointer"
                      style={{ userSelect: "none" }}
                    >
                      {value.toFixed(1)}
                    </span>

                    {/* Increase Button */}
                    {showControls && (
                      <button
                        className="text-[#A673FF] font-bold border p-1 rounded-full border-[#A673FF] bg-white mx-1 cursor-pointer"
                        onClick={increaseValue}
                        aria-label="Increase value"
                      >
                        ➕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
})

export default ProgressBar;
