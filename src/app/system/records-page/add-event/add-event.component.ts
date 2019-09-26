import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { WFMEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/modules/message.module';
import { Subscription } from 'rxjs';


@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Дохід'},
    {type: 'outcome', label: 'Витрати'}
  ];
  s1: Subscription;
  s2: Subscription;
  s3: Subscription;
  message: Message;
  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message("danger","");
  }

  showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(()=>{
      this.message.text = ""
    },5000);
  }
  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;
    if(amount < 0) amount*=-1;
    const event = new WFMEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'),description);
     this.s1 = this.billService.getBill().subscribe((bill: Bill)=>{
      let value: number = 0;
      if (type=== 'outcome'){
        if(amount>bill.value){
          this.showMessage(`На рахунку не достатньо грошей. Вам не вистачає ${amount - bill.value}`);
          return;
        }
        else{
          value = bill.value - amount;
        }
      }
      else{
        value = bill.value + amount;
      }
      this.s2 = this.billService.updateBill({value,currency: bill.currency}).subscribe(()=>{
        form.setValue({
          amount: 0,
          description: "",
          category: 1,
          type: 'outcome'
        });
      });
      this.s3 = this.eventsService.addEvent(event).subscribe();
    });
  }
  ngOnDestroy(): void {
    if(this.s1){
      this.s1.unsubscribe();
    }
    if(this.s2){
      this.s2.unsubscribe();
    }
    if(this.s3){
      this.s3.unsubscribe();
    }
  }
}
