import { NgModule, ErrorHandler } from '@angular/core';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchComponent } from './components/search/search.component';
import { NgxDataTableComponent } from './components/ngx-data-table/ngx-data-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AppErrorHandler } from './common/app-error-handler';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    SearchFormComponent, 
    SearchComponent,
    NgxDataTableComponent,
    AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    SearchFormComponent, 
    SearchComponent,
    NgxDataTableComponent,
    AlertComponent
  ],
  providers:[
    {provide:ErrorHandler,
    useClass:AppErrorHandler}
  ]
})
export class GenericsModule { }
