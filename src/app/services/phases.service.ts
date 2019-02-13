import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from 'projects/generics/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class PhasesService extends DataService{

  constructor(http:Http) {
    super('http://localhost:3000/deyko/phases',http);
   }
}
