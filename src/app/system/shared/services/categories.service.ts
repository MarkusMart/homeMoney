import { BaseApi } from 'src/app/shared/core/base-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
    constructor(public http: HttpClient){
        super(http);
    }
    addCategory(category: Category){
        return this.post('categories', category);
    }
    getCategories(){
        return this.get('categories');
    }
    updateCategory(category: Category){
        return this.put(`categories/${category.id}`,category);
    }
    getCategoryById(id: number){
        return this.get(`categories/${id}`);
    }
}
