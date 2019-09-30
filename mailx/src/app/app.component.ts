import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { Metadata } from '../constants';
import { AppService } from './app.service';

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
