import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  s1: Subscription;
  s2: Subscription;
  bill;
  bankData = [];
  isLoad1 = false;
  isLoad2 = false;
  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.s1 = this.billService.getCurrency().subscribe((b: [])=>{
      this.bankData = b.slice(0,b.length - 1);
      console.log("bankData",this.bankData);
      this.isLoad1 = true;
    });
    this.s2 = this.billService.getBill().subscribe((b)=>{
      this.bill = b['value'];
      console.log("bill",this.bill);
      this.isLoad2 = true;
    });
  }
  ngOnDestroy(): void {
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
