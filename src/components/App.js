import React, { useEffect, useState, memo } from 'react';
import ReactTooltip from 'react-tooltip';
import TooltipMap from './TooltipMap';
import Legend from './Legend';
import './App.css';

const dataURL = `https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json`;

const App = () => {
  const [eduData, setEduData] = useState([]);
  const [tooltip, setTooltip] = useState('');
  const [attrEdu, setAttrEdu] = useState('');

  useEffect(() => {
    fetch(dataURL)
      .then(res => res.json())
      .then(data => setEduData(data));
  }, []);

  return (
    <div className="container">
      <h1 id="title">United States Educational attainment</h1>
      <p id="description">
        {`Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)`}
      </p>
      <TooltipMap
        setTooltip={setTooltip}
        setAttrEdu={setAttrEdu}
        mapData={eduData}
      />
      <ReactTooltip type="light" multiline className="county-tooltip">
        {tooltip && (
          <span id="tooltip" data-education={attrEdu}>
            {tooltip}
          </span>
        )}
      </ReactTooltip>
      <Legend />
    </div>
  );
};

export default memo(App);
