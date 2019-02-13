import { Injectable } from '@angular/core';
import { DataService } from 'projects/generics/src/public_api';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends DataService {

  constructor(http:Http) {
    super('http://localhost:3000/deyko/projects',http);
   }
}
