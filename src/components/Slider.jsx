import React from "react";

const Slider = ({ focus, handleFocus }) => {
  return (
    <div>
      <div className="slider-wrapper">
        <div className="slider" style={{ top: `calc(${focus}*33.33%)` }}></div>
        <div>
          {[1, 2, 3].map((ind) => (
            <p
              key={ind}
              className={ind === focus + 1 ? "focus" : ""}
              onClick={() => {
                handleFocus(ind);
              }}
            >
              {"0" + ind}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
