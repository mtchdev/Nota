import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MODULES, PROVIDERS, IMPORTS } from '../../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../app-routing.module';

import { LoginComponent } from './login.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ...MODULES ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ...IMPORTS
      ],
      providers: [ ...PROVIDERS ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register button should to go auth/register', fakeAsync(() => {
    fixture.ngZone.run(() => {
      spyOn(component, 'register').and.callThrough();
      debug.query(By.css('#register-button')).nativeElement.click();
      expect(component.register).toHaveBeenCalled();
      tick();
      expect(location.path()).toBe('/auth/register');
    });
  }));
});
