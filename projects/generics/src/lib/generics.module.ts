import { NgModule, ErrorHandler } from '@angular/core';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchComponent } from './components/search/search.component';
import { NgxDataTableComponent } from './components/ngx-data-table/ngx-data-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask'
import { AppErrorHandler } from './common/error/app-error-handler';
import { AlertComponent } from './components/alert/alert.component';
import { FormComponent } from './components/form/form.component';

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
