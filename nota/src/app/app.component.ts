import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'providers/electron.service';
import { Metadata } from 'app/app.constants';
import { AppService } from 'app/app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService, private appService: AppService, private translateService: TranslateService) {}

  public ngOnInit(): void {
    console.log(`${Metadata.Name} on v${Metadata.Version}`);
    this.translateService.setDefaultLang('en-US');
    this.translateService.use('en-US');
  }
}
