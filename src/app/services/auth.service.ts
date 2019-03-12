import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'projects/generics/src/public_api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../common/constants';

@Injectable()
export class AuthService extends DataService {

  constructor(http:HttpClient,private router:Router,private jwtHelper:JwtHelperService) {
    super('https://deyko.herokuapp.com/deyko/userlogin',http);
   }

   loggedIn(){
     try{
       return (!!localStorage.getItem(Constants.TOKEN) 
               && !this.jwtHelper.isTokenExpired(localStorage.getItem(Constants.TOKEN)));
     }catch(error){
       return false;
     }
   }

   logoutUser(){
     localStorage.clear();
   }

   getToken(){
     return localStorage.getItem(Constants.TOKEN);
   }
}
