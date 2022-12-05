/* eslint-disable react/prop-types */

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drilldown from 'highcharts-drilldown';

export default function GraphicLine({ data, drill, short }) {
  const options = {
    chart: {
      type: 'column',
    },

    title: {
      text: ' ',
    },

    xAxis: {
      type: 'category',
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
      pointFormat:
        '<i><span style="color:{point.color}">{point.name}</span></i>: <b>{point.y}</b> en total<br/>',
    },

    series: [
      {
        name: `Clicks en ${short}`,
        colorByPoint: true,
        data,
      },
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right',
        },
      },
      series: drill,
    },
  };

  if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) Drilldown(Highcharts);
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
