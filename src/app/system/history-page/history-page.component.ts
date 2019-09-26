import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: WFMEvent[] = [];
  isLoaded1 = false;
  isLoaded2 = false;
  chartData = [];
  s1: Subscription;
  s2: Subscription;
  isFilterVisible = false;
  filteredEvents: WFMEvent[] = [];
  constructor(
    private categoryService : CategoriesService,
    private eventService: EventsService
  ) { }
    setOriginalEvents(){
      this.filteredEvents = this.events.slice();
    }
  ngOnInit() {
    this.s1 = this.categoryService.getCategories().subscribe((category: Category[])=>{
      this.categories = [...category]; 
      this.isLoaded1 = true;
      this.claculateChartData();
    });
    this.s2 = this.eventService.getEvents().subscribe((event: WFMEvent[])=>{
      this.events = [...event];
      this.isLoaded2 = true;
      this.setOriginalEvents();
      this.claculateChartData();
    });
    
  }
  claculateChartData(){
    this.chartData = [];
    this.categories.forEach((c: Category)=>{
      const catEvent = this.filteredEvents.filter((e:WFMEvent)=> e.category === c.id && e.type === "outcome");
      this.chartData.push({
        name: c.name,
        value: catEvent.reduce((total,e)=>{
          total+=e.amount;
          return total;
        },0)
      });
    });
  }
  openFilter() {
    this.toggleFilterVisibility(true);
  }
  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }
  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.claculateChartData();
  }
  onFilterApply(filterData){
   this.toggleFilterVisibility(false);
   this.setOriginalEvents();
   const startPeriod = moment().startOf(filterData.period).startOf('d');
   const endPeriod = moment().endOf(filterData.period).endOf('d');
   this.filteredEvents = this.filteredEvents.filter((e)=>{
     return filterData.types.indexOf(e.type) !==-1;
   }).filter((e)=>{
     return filterData.categories.indexOf(e.category.toString()) !==-1;
   }).filter((e)=>{
    const momentDate = moment(e.date, "DD.MM.YYYY HH:mm:ss");
    return momentDate.isBetween(startPeriod, endPeriod);
   });
   this.claculateChartData();
  }
  ngOnDestroy(): void {
      if(this.s1&&this.s2){
        this.s1.unsubscribe();
        this.s2.unsubscribe();
      }
  }

}
