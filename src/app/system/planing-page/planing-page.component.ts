import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;
  isLoaded1 = false;
  isLoaded2 = false;
  isLoaded3 = false;
  bill: Bill;
  categories: Category[]=[];
  events: WFMEvent[]=[]; 
  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventsService
  ) { }

  ngOnInit() {
    this.s1 = this.billService.getBill().subscribe((bill:Bill)=>{this.bill = bill; this.isLoaded1 = true;});
    this.s2 = this.categoriesService.getCategories().subscribe((categories:Category[])=>{
      this.categories = [...categories];
      this.isLoaded2 = true;});
    this.s3 = this.eventService.getEvents().subscribe((event:WFMEvent[])=>{this.events = [...event];
     this.isLoaded3 = true});
  }
  getCategoryCost(cat: Category): number{
    const catEvents = this.events.filter((e)=> e.category === cat.id && e.type === "outcome");
    return catEvents.reduce((total,e)=>{
      total+=e.amount;
      return total;
    },0);
  }
  private getPercent(category: Category): number{
    const percent = (100*this.getCategoryCost(category))/category.capacity;
    return percent > 100 ? 100: percent;
  }
  getCatPercent(category: Category):string{
    return this.getPercent(category)+"%";
  }
  getCatColorClass(category: Category): string{
    const percent = this.getPercent(category);
    return percent < 60 ? "success" : percent >= 100 ? "danger": "warning";

  }
  ngOnDestroy(){
    if(this.s1) this.s1.unsubscribe();
    if(this.s2) this.s2.unsubscribe();
    if(this.s3) this.s3.unsubscribe();
  }
}
