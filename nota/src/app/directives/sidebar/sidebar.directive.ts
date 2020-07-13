import { Component, OnInit } from '@angular/core';
import { Notebook } from 'app/models/core/Notebook';
import { AuthService } from 'app/components/auth/auth.service';
import * as cl from 'color';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NotebookService } from 'app/components/app/notebook.service';

type MenuType = 'generic' | 'settings';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.directive.html'
})
export class SidebarDirectiveComponent implements OnInit {

    public activeMenu: MenuType;
    public notebooks: Notebook[] = [];
    public newNotebook: Notebook;
    public showNewNotebook = false;
    public newNotebookError = null;

    public contextMenuProps = {
        x: 0,
        y: 0,
        show: false
    };
    public contextNotebook: Notebook;

    constructor(public authService: AuthService, private notebookService: NotebookService) {}

    ngOnInit() {
        this.activeMenu = 'generic';

        this.notebookService.getAllNotebooks().subscribe(
            data => {
                data.data.forEach((notebook: Notebook) => {
                    this.notebooks.push(notebook);
                });

                console.log(this.notebooks)
            }
        );
    }

    public lighten(color: string): string {
        return cl('#' + color).lighten(0.75).hex();
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

        if (!this.newNotebook.name) {
            this.newNotebookError = 'Please enter a notebook title.';
            return;
        }

        if (!this.newNotebook.color) {
            this.newNotebookError = 'Please select a color.';
            return;
        }

        this.notebookService.createNotebook(this.newNotebook).subscribe(
            data => {
                console.log(data.data);
                this.notebooks.push(this.newNotebook);
                this.newNotebook = undefined;
                this.showNewNotebook = false;
            },
            error => {
                console.log(error);
            }
        );
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

    public showNotebookContext(event: any, notebook: Notebook): void {
        this.contextMenuProps = {
            x: event.pageX,
            y: event.pageY,
            show: true
        };

        console.log(this.contextMenuProps);

        this.contextNotebook = notebook;
    }
}
