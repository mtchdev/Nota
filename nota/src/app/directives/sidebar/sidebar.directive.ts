import { Component, OnInit } from '@angular/core';

type MenuType = 'generic' | 'settings';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.directive.html'
})
export class SidebarDirectiveComponent implements OnInit {

    public activeMenu: MenuType;

    ngOnInit() {
        this.activeMenu = 'generic';
    }
}
