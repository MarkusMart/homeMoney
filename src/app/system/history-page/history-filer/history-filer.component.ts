import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-filer',
  templateUrl: './history-filer.component.html',
  styleUrls: ['./history-filer.component.scss']
})
export class HistoryFilerComponent implements OnInit {

  @Output() onFilterApply = new EventEmitter<any>();
  @Output() onFilterCancel = new EventEmitter<any>();
  @Input() categories: Category[] = [];
  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Тиждень'},
    {type: 'M', label: 'Місяць'}
  ];
  types = [
    {type: 'income', label: 'Дохід'},
    {type: 'outcome', label: 'Витрати'}
  ];
  selectedPeriod ='d';
  selectedTypes = [];
  selectedCategories = [];
  constructor() { }
  private calculateInputParams(field: string, checked: boolean, value: string){
    if(checked){
      this[field].indexOf(value) === -1 ? this[field].push(value): null;
    }
    else{
      this[field] = this[field].filter((i)=> i!==value);
    }
  }
  handleChangeType({checked, value}){
    this.calculateInputParams('selectedTypes',checked,value);
  }
  handleChangeCategory({checked, value}){
    this.calculateInputParams('selectedCategories',checked,value);
  }
  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
  ngOnInit() {
  }
  closeFilter(){
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = "d";
    this.onFilterCancel.emit();

  }

}
