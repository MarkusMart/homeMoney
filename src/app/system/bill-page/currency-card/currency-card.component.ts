import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  date: Date;
  @Input() bankData = [];
  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
