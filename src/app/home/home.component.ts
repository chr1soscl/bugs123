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
     [
      {id: 'id', label: 'Id', type: 'number', validators: ['required', 'max|10']},
      {id: 'fName', label: this.translate.instant('Homepage.first-name'), type: 'text'},
      {id: 'lName', label: this.translate.instant('Homepage.last-name'), type: 'text'},
      {id: 'dob', label: this.translate.instant('Homepage.dob'), type: 'date', required:true}
     ],
     [
      {id: 'aLine1', label: 'Address Line', type: 'text'},
      {id: 'aLine2', label: 'Address Line 2', type: 'text'},
      {id: 'zip', label: 'Zip Code', type: 'text'},
      {id: 'city', label: 'City', type: 'text'},
      {id: 'phone', label: 'Phone Number', type: 'text',mask:'(000) 000-0000'},
      {id: 'ssn', label: 'SSN', type: 'text',mask:'000-00-0000'},
      {id: 'ccn', label: 'Credit Card Number', type: 'text',mask:'0000-0000-0000-0000'},
      {id: 'state', label: 'State', type: 'combobox',
       options: states.getStates(),
       required:true},
       {id: 'phase', label: 'Testing Phase', type: 'checkbox',
       options: [
         {id: 'SIT', label: 'SIT'},
         {id: 'UAT', label: 'UAT'},
         {id: 'REG', label: 'REG'}
       ],
       required:true},
       {id: 'sex', label: 'Sex', type: 'radio',
       options: [
         {id: 'M', label: 'Male'},
         {id: 'F', label: 'Female'}
       ]}
     ],
     [
      {id: 'comments', label: 'Comments', type: 'textarea'}
     ],
     [
        {label: this.translate.instant('Navigationpage.search'), type: 'button', action: 'search'},
        {label: this.translate.instant('Homepage.clear'), type: 'reset'}
     ]
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
    console.log('onClick', event);
    this.userService.getId(event[0].id).subscribe(
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
