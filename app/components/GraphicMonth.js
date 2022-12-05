/* eslint-disable react/prop-types */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function GraphicLine({ data, short }) {
  const options = {
    chart: {
      type: 'spline',
    },

    title: {
      text: ' ',
    },

    xAxis: {
      categories: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    },

    yAxis: {
      title: {
        text: 'Clicks realizados',
      },
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y} Clicks',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<b>{point.y}</b> en total<br/>',
    },

    series: [
      {
        name: `Clicks en ${short}`,
        data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
