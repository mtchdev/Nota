import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/components/auth/auth.service';
import { Router } from '@angular/router';
import { Notebook } from 'app/models/core/Notebook';
import * as cl from 'color';

type Step = 'notebook' | 'color' | 'finish';

@Component({
  templateUrl: './notebook.component.html'
})
export class OnboardingNotebookComponent implements OnInit {

  public notebook: Notebook = {
    title: null,
    color: null,
    notes: []
  };
  public step: Step = 'notebook';

  public errors = {
    notebook: null
  };
  public notebookTitle: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public createNotebook(): void {
    this.errors.notebook = null;

    if (!this.notebookTitle) {
      this.errors.notebook = 'Please enter a notebook title.';
    }
    if (this.notebookTitle && this.notebookTitle.length > 30) {
      this.errors.notebook = 'The title must be under 30 characters.';
    }

    if (this.errors.notebook) { return; }

    this.notebook.title = this.notebookTitle;
    this.step = 'color';
  }

  public setColor(): void {
    this.step = 'finish';
  }

  public lighten(color: string): string {
    return cl(color).lighten(0.75).hex();
  }

}
