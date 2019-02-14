import { Injectable } from '@angular/core';
import { DataService } from 'projects/generics/src/public_api';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService extends DataService{

  constructor(http:Http) {
    super('https://deyko.herokuapp.com/deyko/releases',http);
   }
}
