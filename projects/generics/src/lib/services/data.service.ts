//Angular Core
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
//Errors
import { InvalidUserError } from '../common/error/invalid-user-error';
import { BadRequestError } from '../common/error/bad-request-error';
import { NotFoundError } from '../common/error/not-found-error';
import { AppError } from '../common/error/app-error';
//rxjs
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../common/constants/constants';

@Injectable()
export class DataService {

  constructor(@Inject(String) private _url:string, private http: HttpClient) { }

  getAll(){
    return this.http.get(this._url)
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  create(resource){
    return this.http.post(this._url,JSON.stringify(resource))
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  update(resource){
    return this.http.patch(this._url+Constants.BACK_SLASH+resource.id,JSON.stringify({isRead:true}))
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(id){
    return this.http.delete(this._url+Constants.BACK_SLASH+id)
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  getId(id){
    return this.http.get(this._url+Constants.BACK_SLASH+id)
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  getObject(resource){
    return this.http.post(this._url,resource)
    .pipe(
      map(response=>response)
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:Response){
    console.log('DataService.handleError.error',error);
    if(error.status===404)
        return throwError(new NotFoundError());
    if(error.status===400)
        return throwError(new BadRequestError());
    if(error.status===401)
        return throwError(new InvalidUserError())
    return throwError(new AppError(error));
  }


}
