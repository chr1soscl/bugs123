//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SystemDataComponent } from './system-data/system-data.component';
import { BugsDataComponent } from './bugs-data/bugs-data.component';
//Guards
import { AuthGuard } from './services/auth.guard';

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
  { path: "home", component: HomeComponent, canActivate:[AuthGuard] },
  { path: "statistics", component: StatisticsComponent, canActivate:[AuthGuard] },
  { path: "systemdata", component: SystemDataComponent, canActivate:[AuthGuard] },
  { path: "bugsdata", component: BugsDataComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
