//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { GenericsModule } from 'projects/generics/src/public_api';
//Component
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { SystemDataComponent } from './system-data/system-data.component';
import { BugsDataComponent } from './bugs-data/bugs-data.component';
//Guard
import { AuthGuard } from './services/auth.guard';
//Services
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

export function jwtTokenGetter(){
    return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    StatisticsComponent,
    BugDetailsComponent,
    SystemDataComponent,
    BugsDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GenericsModule,
    Ng2GoogleChartsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: jwtTokenGetter
      }
    })  
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtHelperService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
