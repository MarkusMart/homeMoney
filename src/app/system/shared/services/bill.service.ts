import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService{
    constructor(
        private http: HttpClient
    ){}
    getBill(){
        return this.http.get('http://localhost:3000/bill');
    }
    updateBill(bill: Bill){
        return this.http.put('http://localhost:3000/bill',bill);
    }
    getCurrency(){
        return this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }
}