import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input()categories: Category[] = [];
  @Input()events: WFMEvent[] = [];
  searchValue = "";
  searchPlaceholder = 'Сума';
  searchField = 'amount';
  constructor() { }

  ngOnInit() {
    this.events.forEach((e)=>{
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }
  getEventClass(e: WFMEvent){
    return{
      'label':true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }
  changeCriteria(field: string){
    const namesMap = {
      amount: "Сума",
      date: "Дата",
      category: "Категорія",
      type: "Тип"
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
