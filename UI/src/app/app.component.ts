import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly supportedLanguages = [
    'cs-CZ', 'en-US'
  ];

  constructor(private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.setDefaultLang('en-US');
  }
}
