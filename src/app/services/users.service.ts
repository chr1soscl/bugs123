import { Injectable } from '@angular/core';
import { DataService } from 'projects/generics/src/public_api';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService {

  constructor(http:Http) {
    super('https://jsonplaceholder.typicode.com/users',http);
   }
}
