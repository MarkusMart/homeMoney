import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { WFMEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded = false;
  event: WFMEvent;
  category: Category;
  s1: Subscription;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.s1 = this.route.params.subscribe((params: Params)=>{
      this.eventService.getEventById(params['id']).subscribe((event: WFMEvent)=>{
        this.event = event;
        return this.categoryService.getCategoryById(event.category).subscribe((category: Category)=>{
          this.category = category;
          this.isLoaded = true;
      })
    })
  });
  }
  ngOnDestroy(): void {
    if(this.s1){
      this.s1.unsubscribe();
    }
  }
}
