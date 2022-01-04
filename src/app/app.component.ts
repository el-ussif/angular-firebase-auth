import { Component } from '@angular/core';
import {setTheme} from 'ngx-bootstrap/utils';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eco-invoice-app';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    setTheme('bs4');
  }
}
