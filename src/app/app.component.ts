import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bugs123';

    constructor(public authService:AuthService,
                private translate: TranslateService){
                  translate.setDefaultLang('en');
                }

  
    switchLanguage(language: string) {
      this.translate.use(language);
    }

}
