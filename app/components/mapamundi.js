/* eslint-disable react/prop-types */

import React from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import './mapData';

export default function Mapamundi({ data }) {
  const options = {
    chart: {
      map: 'custom/world-robinson-highres',
    },
    colorAxis: {
      min: 0,
      stops: [[0, '#5555FF'], [0.67, '#222299'], [1, '#000011']],
    },
    title: {
      text: 'Clicks Realizados segun la Ubicacion',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    series: [
      {
        data,
        mapData: 'custom/world-robinson-highres',
        name: 'Click Realizados',
        states: {
          hover: {
            color: '#a4edba',
          },
        },
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
      />
    </>
  );
}
