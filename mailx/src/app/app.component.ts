import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { Metadata } from '../constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService) {}

  public ngOnInit(): void {
    console.log(`${Metadata.Name} on v${Metadata.Version}`);
  }
}
