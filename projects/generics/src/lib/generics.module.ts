import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchComponent } from './components/search/search.component';
import { NgxDataTableComponent } from './components/ngx-data-table/ngx-data-table.component';
import { AlertComponent } from './components/alert/alert.component';
import { FormComponent } from './components/form/form.component';

import { AppErrorHandler } from './common/error/app-error-handler';

@NgModule({
  declarations: [
    SearchFormComponent, 
    SearchComponent,
    NgxDataTableComponent,
    AlertComponent,
    FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    SearchFormComponent, 
    SearchComponent,
    NgxDataTableComponent,
    AlertComponent,
    FormComponent
  ],
  providers:[
    {provide:ErrorHandler,
    useClass:AppErrorHandler}
  ]
})
export class GenericsModule { }
