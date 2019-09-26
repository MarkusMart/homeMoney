import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../modules/user.model';



@Injectable()
export class UsersService {
    constructor(private http: HttpClient){
        
    }
    getUserByEmail(email: string){
        return this.http.get(`http://localhost:3000/users?email=${email}`);
    }
    createNewUser(user: User) {
        return this.http.post(`http://localhost:3000/users`, user);
    }
}