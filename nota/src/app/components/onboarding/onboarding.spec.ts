import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { OnboardingComponent } from './onboarding.component';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';
import { AppModule } from 'app/app.module';

describe('OnboardingComponent', () => {
    let component: OnboardingComponent;
    let fixture: ComponentFixture<OnboardingComponent>;
    let de: DebugElement;
    let location: Location;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes(routes), AppModule ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        location = TestBed.get(Location);
        router = TestBed.get(Router);
        router.initialNavigation();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should to go auth/register`', fakeAsync(() => {
        fixture.ngZone.run(() => {
            spyOn(component, 'button').and.callThrough();
            de.nativeElement.querySelector('button').click();
            expect(component.button).toHaveBeenCalled();
            tick();
            expect(location.path()).toBe('/auth/register');
        });
    }));
});
