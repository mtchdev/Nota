import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'app/app-routing.module';
import { User } from 'models/auth/User';
import { LoginComponent } from './login.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { AppModule } from 'app/app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let debug: DebugElement;
  let service: MockAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule.withRoutes(routes) ],
      providers: [ {provide: AuthService, useClass: MockAuthService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
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

  it('should successfully login a mock user on submit', (() => {
    spyOn(service, 'login').and.callThrough();
    spyOn(component, 'submit').and.callThrough();
    fakeFields();
    debug.query(By.css('#login-button')).nativeElement.click();
    expect(component.submit).toHaveBeenCalled();
    expect(service.login).toHaveBeenCalled();

    expect(service.user).not.toBeUndefined();
    expect(service.token).not.toBeUndefined();
  }));

  it('should not submit and produce errors if no fields are filled', (() => {
    spyOn(service, 'login').and.callThrough();
    component.submit();
    expect(component.errors.username).toBeTruthy();
    expect(component.errors.password).toBeTruthy();
    expect(service.login).not.toHaveBeenCalled();
  }));

  /**
   * Helpers
   */
  function fakeFields(): void {
    component.username = 'spliitzx';
    component.password = 'hunter2';
  }
});

class MockAuthService {

  user;
  token;

  public login(form: any): Observable<AuthResponse> {
    let user = new User({});
    user.username = form.username;
    user.email = form.password;
    return of({
      data: {
        token: '1',
        user: user
      }
    });
  }

}

interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}
