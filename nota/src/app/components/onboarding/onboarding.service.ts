import { Injectable } from '@angular/core';

// REPLACE THIS WITH A REAL ENTITY!!!!!
interface Notebook {
  title: string;
  color: string;
  tasks: string[];
}

@Injectable()
export class OnboardingService {

  public notebook: Notebook = {
    title: null,
    color: null,
    tasks: []
  };

  constructor() { }
}
