import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  @Input() data;
  view: any[] = [545,355];
  constructor() { }

  ngOnInit() {
  }

}
