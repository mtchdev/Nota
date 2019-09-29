import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../../app-routing.module';
import { MODULES } from '../../../shared.module';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let location: Location;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ...MODULES ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button should to go auth/login', fakeAsync(() => {
    fixture.ngZone.run(() => {
      spyOn(component, 'login').and.callThrough();
      debug.query(By.css('#login-button')).nativeElement.click();
      expect(component.login).toHaveBeenCalled();
      tick();
      expect(location.path()).toBe('/auth/login');
    });
  }));
});
