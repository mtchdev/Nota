import { Component, OnInit } from '@angular/core';
import { Notebook } from 'app/models/core/Notebook';
import * as cl from 'color';

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

    ngOnInit() {
        this.activeMenu = 'generic';

        this.notebooks = [
            {
                title: 'Notebook Title',
                color: '#00FF31',
                content: null,
                tasks: []
            }
        ];
    }

    public lighten(color: string): string {
        return cl(color).lighten(0.75).hex();
    }

    public initiateNewNotebook(): void {
        this.newNotebook = {
            title: '',
            color: '',
            content: '',
            tasks: []
        };

        this.showNewNotebook = true;
    }

    public createNotebook(): void {
        this.showNewNotebook = false;
        this.newNotebook = undefined;
        // TODO
    }

    public cancelNewNotebook(): void {
        this.showNewNotebook = false;
        this.newNotebook = undefined;
    }
}
