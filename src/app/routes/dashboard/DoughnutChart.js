import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';


const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  const _stroke = ctx.stroke;
  ctx.stroke = function () {
    ctx.save();
    ctx.shadowColor = 'rgba(76,175,80,0.8)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;
    _stroke.apply(this, arguments);
    ctx.restore();
  };
  return {
    labels: [
      'Rejected',
      'Approved',
    ],
    datasets: [{
      data: [100, 300],
      backgroundColor: ['#FF0000','#4169E1'],
      borderColor: ['#FF0000','#4169E1'],
      hoverBackgroundColor: ['#FF0000','#4169E1'],
    }],

  }
}

const options = {
  legend: {
    display: false,
    labels: {
      fontColor: '#AAAEB3'
    }
  },
  layout: {
    padding: {
      bottom: 20
    }
  },
  cutoutPercentage: 75,
  borderWidth: 0
};


class DoughnutChart extends Component {

  render() {
    return (
      <Doughnut  data={data} options={options} height={250}/>
    );
  }
}

export default DoughnutChart;