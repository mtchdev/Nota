import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'providers/electron.service';
import { Metadata } from 'app/app.constants';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService, private appService: AppService) {}

  public ngOnInit(): void {
    console.log(`${Metadata.Name} on v${Metadata.Version}`);
  }
}
