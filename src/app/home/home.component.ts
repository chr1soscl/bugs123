import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { states } from '../common/states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   dataResults: any;
   columns = ['name', 'username', 'email', 'phone', 'website'];

   formFields: any[] = [
    {id: 'id', label: 'Id', type: 'text', validators: ['required', 'max|10']},
     {label: 'Search', type: 'button'},
     {label: 'Clean', type: 'reset'}
   ];

   formFields2: any[] = [
      {id: 'id', label: 'Id', type: 'number', validators: ['required', 'max|10']},
      {label: this.translate.instant('Navigationpage.search'), type: 'submit', action: 'search'},
      {label: this.translate.instant('Homepage.clear'), type: 'reset'}
   ];

  constructor(private userService: UsersService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        console.log(data);
        this.dataResults = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onClick(event: any): void {
    console.log('onClick>', event);
    this.userService.getId(event.id).subscribe(
      data => {
        this.dataResults = [];
        this.dataResults.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
