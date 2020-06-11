import React, { useCallback, memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { domainRange, colorRange } from './constant';

const topoJSON = `https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json`;

const colorScale = scaleQuantile()
  .domain(domainRange)
  .range(colorRange);

const formatFips = fips => {
  const fipsStr = `${fips}`;
  if (fipsStr.length > 4) return fipsStr;
  return `0${fipsStr}`;
};

const TooltipMap = ({ setTooltip, mapData, setAttrEdu }) => {
  const handleMouseLeave = useCallback(() => {
    setAttrEdu('');
    setTooltip('');
  }, [setTooltip]);

  const Geo = ({ geographies }) =>
    geographies.map(geo => {
      const { id } = geo;
      const currCounty = mapData.find(data => formatFips(data.fips) === id);
      const currEdu = currCounty ? currCounty.bachelorsOrHigher : '';
      const tooltips = currCounty
        ? `
        ${currCounty.area_name} (${currCounty.state}):
        ${currEdu}%
      `
        : '';
      const handleMouseEnter = () => {
        if (!currCounty) {
          setAttrEdu('');
          setTooltip('');
        } else {
          setAttrEdu(currEdu);
          setTooltip(tooltips);
        }
      };
      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="county"
          data-fips={currCounty ? currCounty.fips : ''}
          data-education={currCounty ? currEdu : ''}
          fill={
            currCounty ? colorScale(currCounty.bachelorsOrHigher) : '#e0fff0'
          }
        />
      );
    });
  return (
    <ComposableMap
      data-tip=""
      width={640}
      height={480}
      projection="geoAlbersUsa"
      style={{ width: '80vw', height: '80vh' }}
    >
      <Geographies geography={topoJSON}>{Geo}</Geographies>
    </ComposableMap>
  );
};

export default memo(TooltipMap);
