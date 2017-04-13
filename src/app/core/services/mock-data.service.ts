import { Injectable }              from '@angular/core';

@Injectable()
export class MockDataService {

  initStat(dateCount) {
    var stats = {
      series: {
        temp: ['Nhiệt độ'],
        humid: ['Độ ẩm không khí'],
        light: ['Ánh sáng'],
        pressure: ['Áp suất'],
        pH: ['pH'],
        ec: ['EC']
      },
      data: {
        temp: [],
        humid: [], // humidity - độ ẩm
        light: [],
        pressure: [],
        pH: [],
        ec: []
      },
      labels: [],
      options: {
          lineSmooth: false,
          fullWidth: true,
          chartPadding: {
              top: 15,
              right: 45,
              bottom: 5,
              left: 10
          },
      }
    };

    stats.labels = [];

    function randomInt(value, dt) {
      var min = value - dt,
          max = value + dt;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFloat(value, dt) {
      return randomInt(value * 10, dt * 10) / 10;
    }
    for (var i = 0; i < dateCount; i++) {
        var date = new Date();
        date.setDate(date.getDate() + i);
        date = new Date();
        date.setDate(date.getDate() - dateCount + i + 1);
        stats.labels.push(date.getDate() + '/' + (date.getMonth() + 1));

        stats.data.temp[i]   = randomInt(22, 5);
        stats.data.humid[i]  = randomInt(75, 15);
        stats.data.light[i]  = randomInt(475, 125);
        stats.data.pressure[i]  = randomInt(475, 125);
        stats.data.pH[i]     = randomFloat(6.2, 0.5);
        stats.data.ec[i]     = randomFloat(1.1, 0.4);
    }

    return stats;
  }
}
