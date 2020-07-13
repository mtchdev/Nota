import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { OnboardingNotebookComponent } from './notebook.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from 'app/app-routing.module';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotebookComponent', () => {
    let component: OnboardingNotebookComponent;
    let fixture: ComponentFixture<OnboardingNotebookComponent>;
    let location: Location;
    let router: Router;
    let service: MockAuthService;
    let debug: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes(routes), AppModule ],
            providers: [ {provide: AuthService, useClass: MockAuthService} ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingNotebookComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
        router = TestBed.get(Router);
        debug = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should successfully set a notebook title', (() => {
        expect(component.notebook.name).toBeNull();
        component.notebookTitle = 'English Homework';
        component.createNotebook();
        expect(component.notebook.name).toBeTruthy();
    }));

    it('should go to the `color` step after setting a notebook title', (() => {
        component.notebookTitle = 'English Homework';
        component.createNotebook();
        expect(component.step).toBe('color');
    }));

    it('should produce errors if the title is above 30 characters', (() => {
        component.notebookTitle = 'shhhhhhhhhdhsadgsahdgsahjdhsajgdasjhgdasjhgdas';
        component.createNotebook();
        expect(component.errors.notebook).toBeTruthy();
    }));

    it('should produce errors when values are null', (() => {
        component.createNotebook();
        expect(component.errors.notebook).toBeTruthy();
    }));

    it('should set the color when clicked', (() => {
        component.step = 'color';
        fixture.detectChanges();
        debug.query(By.css('#FF0000')).nativeElement.click();
        expect(component.notebook.color).toBe('FF0000');
    }));
});

class MockAuthService {
    user = {
        username: 'test',
        email: 'foo@bar.com'
    };
}
