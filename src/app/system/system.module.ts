import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlaningPageComponent } from './planing-page/planing-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropDownDirective } from './shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.service';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from './shared/services/categories.service';
import { EventsService } from './shared/services/events.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilerComponent } from './history-page/history-filer/history-filer.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, SharedModule, SystemRoutingModule, FormsModule],
    declarations: [BillPageComponent, HistoryPageComponent, PlaningPageComponent, RecordsPageComponent, SystemComponent,
         SidebarComponent, HeaderComponent, DropDownDirective, BillCardComponent, CurrencyCardComponent, AddEventComponent,
          AddCategoryComponent, EditCategoryComponent, HistoryChartComponent, HistoryEventsComponent, 
          HistoryDetailComponent, HistoryFilerComponent, FilterPipe],
    providers: [BillService, CategoriesService, EventsService]
})
export class SystemModule{

}