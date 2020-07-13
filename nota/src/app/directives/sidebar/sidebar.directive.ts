import { Component, OnInit } from '@angular/core';
import { Notebook } from 'app/models/core/Notebook';
import { AuthService } from 'app/components/auth/auth.service';
import * as cl from 'color';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

type MenuType = 'generic' | 'settings';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.directive.html'
})
export class SidebarDirectiveComponent implements OnInit {

    public activeMenu: MenuType;
    public notebooks: Array<Notebook>;
    public newNotebook: Notebook;
    public showNewNotebook = false;
    public newNotebookError = null;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.activeMenu = 'generic';

        this.notebooks = [
            {
                title: 'Notebook Title',
                color: '#00FF31',
                notes: []
            }
        ];
    }

    public lighten(color: string): string {
        return cl(color).lighten(0.75).hex();
    }

    public initiateNewNotebook(): void {
        this.newNotebook = new Notebook({});

        this.showNewNotebook = true;
    }

    public selectColor(color: string): void {
        this.newNotebook.color = color;
        this.newNotebookError = null;
    }

    public createNotebook(): void {
        this.newNotebookError = null;

        if (!this.newNotebook.title) {
            this.newNotebookError = 'Please enter a notebook title.';
            return;
        }

        if (!this.newNotebook.color) {
            this.newNotebookError = 'Please select a color.';
            return;
        }

        this.notebooks.push(this.newNotebook);
        this.showNewNotebook = false;
        this.newNotebook = undefined;
    }

    public cancelNewNotebook(): void {
        this.showNewNotebook = false;
        this.newNotebook = undefined;
    }

    public toggleMenu(): void {
        this.activeMenu = this.activeMenu === 'generic' ? 'settings' : 'generic';
    }

    public dropNotebook(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.notebooks, event.previousIndex, event.currentIndex);
    }
}
