import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bankData = [];
  @Input() bill;
  constructor() { }

  ngOnInit() {
  }

}
