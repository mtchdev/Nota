import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDirectiveComponent } from './sidebar.directive';
import { AppModule } from 'app/app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Notebook } from 'app/models/core/Notebook';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';

describe('SidebarDirectiveComponent', () => {
    let component: SidebarDirectiveComponent;
    let fixture: ComponentFixture<SidebarDirectiveComponent>;
    let debug: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [ MOCK_AUTH_PROVIDER ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarDirectiveComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should go to settings menu when clicked', () => {
        fixture.ngZone.run(() => {
            spyOn(component, 'toggleMenu').and.callThrough();
            debug.query(By.css('#toggle-settings')).nativeElement.click();
            expect(component.toggleMenu).toHaveBeenCalled();
            expect(component.activeMenu).toBe('settings');
        });
    });

    it('should go to generic menu when on settings menu', () => {
        fixture.ngZone.run(() => {
            component.toggleMenu();
            fixture.detectChanges();
            spyOn(component, 'toggleMenu').and.callThrough();
            debug.query(By.css('#toggle-generic')).nativeElement.click();
            expect(component.toggleMenu).toHaveBeenCalled();
            expect(component.activeMenu).toBe('generic');
        });
    });

    it('should push a new notebook to notebooks when created', () => {
        component.newNotebook = new Notebook({
            title: 'Notebook Title',
            color: '#00FF31',
            notes: []
        });

        component.createNotebook();
        expect(component.notebooks.length).toEqual(2);
        expect(component.newNotebook).toBeUndefined();
    });

    it('should open create notebook modal with new object when button is clicked', () => {
        spyOn(component, 'initiateNewNotebook').and.callThrough();
        debug.query(By.css('#create-notebook')).nativeElement.click();
        expect(component.initiateNewNotebook).toHaveBeenCalled();
        expect(component.newNotebook).not.toBeUndefined();
        expect(component.showNewNotebook).toBeTruthy();
    });

    it('should produce errors when the title is null for a new notebook', () => {
        component.initiateNewNotebook();
        component.createNotebook();
        expect(component.newNotebookError).toBeTruthy();
        expect(component.notebooks.length).toEqual(1);
    });

    it('should produce an error when no color is selected for a new notebook', () => {
        component.initiateNewNotebook();
        component.newNotebook.title = 'Test';
        component.createNotebook();
        expect(component.newNotebookError).toBeTruthy();
        expect(component.notebooks.length).toEqual(1);
    });
});

class MockAuthService {
    
    user = {
        username: 'test',
        email: 'test'
    };
    
}
