import { Component, OnInit } from '@angular/core';
import { ConfigGraph } from './config_graph';

@Component({
  selector: 'app-summarychart',
  templateUrl: './summarychart.component.html',
  styleUrls: ['./summarychart.component.css']
})
export class SummarychartComponent implements OnInit {
  totalSubs: number[] = [916543, 917143, 887632, 787143, 727143, 887632, 787143, 916543, 917143, 937143, 977143, 987643];
  totalCtt: number[] = [916543, 917143, 887632, 787143, 727143, 887632, 787143, 916543, 917143, 937143, 977143, 987643];
  subscriber: number[] = [];
  ctt: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public graph = {
    data: [{
      x: ConfigGraph.list_month,
      y: this.totalSubs,
      type: 'bar',
      // mode: 'lines+points',
      name: 'Total Subscribers',
      marker: { color: ConfigGraph.colorBar.totalSubs },
    }, {
      x: ConfigGraph.list_month,
      y: this.totalCtt,
      type: 'bar',
      name: 'Total CTT',
      marker: { color: ConfigGraph.colorBar.totalCTT },
    }],

    layout: {
      autosize: true,
      barmode: 'stack',
    },

    config: {
      displayModeBar: false,
    }
  };

}
