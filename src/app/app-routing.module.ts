import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SystemDataComponent } from './system-data/system-data.component';
import { BugsDataComponent } from './bugs-data/bugs-data.component';

//add auth guard



const routes: Routes = [
  {
    path:"",
    redirectTo: "bugs123",
    pathMatch: "full"
  },
  {
    path:"bugs123",
    redirectTo:"bugs123",
    pathMatch: "full"
  },
  { path: "bugs123", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "systemdata", component: SystemDataComponent },
  { path: "bugsdata", component: BugsDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
