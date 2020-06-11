import React from 'react';
import { colorRange, domainRange } from './constant';
import './Legend.css';

const Legend = () => {
  const legendRange = domainRange.map((range, idx) => {
    return (
      <div
        key={range}
        className="legend-box"
        style={{ backgroundColor: colorRange[idx] }}
      >
        <span className="legend-text">{`${range}%`}</span>
        <div className="legend-tick" />
      </div>
    );
  });
  return (
    <div className="legend-container" id="legend">
      {legendRange}
    </div>
  );
};

export default Legend;
