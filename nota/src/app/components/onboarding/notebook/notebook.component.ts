import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/components/auth/auth.service';
import { Router } from '@angular/router';
import { Notebook } from 'app/models/core/Notebook';

type Step = 'notebook' | 'color' | 'tasks' | 'finish';

@Component({
  templateUrl: './notebook.component.html'
})
export class OnboardingNotebookComponent implements OnInit {

  public notebook: Notebook = {
    title: null,
    content: null,
    color: null,
    tasks: []
  };
  public step: Step = 'notebook';

  public errors = {
    notebook: null
  };
  public notebookTitle: string;
  public notebookColor: string;
  public notebookTasks: string[];

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createNotebook(): void {
    this.errors.notebook = null;

    if (!this.notebookTitle) {
      this.errors.notebook = 'Please provide a notebook title.';
    }
    if (this.notebookTitle && this.notebookTitle.length > 30) {
      this.errors.notebook = 'The title must be under 30 characters.';
    }

    if (this.errors.notebook) { return; }

    this.notebook.title = this.notebookTitle;
    this.step = 'color';
  }

  setColor(): void {
    // TODO
  }

}
