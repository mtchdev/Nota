import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from 'app/app-routing.module';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { User } from 'models/auth/User';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { AppModule } from 'app/app.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    location = TestBed.get(Location);
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('authToken');
    service = null;
    component = null;
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

  it('should successfully register a new mock user on submit', (() => {
    spyOn(service, 'register').and.callThrough();
    spyOn(component, 'submit').and.callThrough();
    fakeFields();
    component.termsConditions = true;
    component.privacyPolicy = true;
    debug.query(By.css('#register-button')).nativeElement.click();
    expect(service.register).toHaveBeenCalled();
    expect(component.registerLoading).toBeFalsy();

    expect(service.user).not.toBeUndefined();
    expect(service.token).not.toBeUndefined();
  }));

  it('should produce errors when values are null', (() => {
    component.submit();
    // https://github.com/adobe/brackets/pull/5492
    expect(component.errors.username).toBeTruthy();
    expect(component.errors.email).toBeTruthy();
    expect(component.errors.password).toBeTruthy();
    expect(component.registerLoading).toBeFalsy();
    expect(component.errors.terms).not.toBeNull();
    expect(component.errors.privacy).not.toBeNull();
  }));

  it('should produce an error with an invalid email address', (() => {
    fakeFields();
    component.email = 'invalid@emailaddress';
    component.submit();
    expect(component.errors.email).toBeTruthy();
  }));

  it('should produce an error if the username is less than 3 characters', (() => {
    fakeFields();
    component.username = 'us';
    component.submit();
    expect(component.errors.username).toBeTruthy();
  }));

  it('should open modal when continuing without an account', (() => {
    debug.query(By.css('#no-account')).nativeElement.click();
    expect(component.showContinueWithoutModal).toBeTruthy();
  }));

  /**
   * Helpers
   */
  function fakeFields() {
    component.email = 'me@miitch.io';
    component.username = 'spliitzx';
    component.password = 'hunter2';
  }
});

class MockAuthService {

  user;
  token;

  public register(form: RegisterForm): Observable<AuthResponse> {
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

  public init(data: any): void {
    this.user = data.user;
    this.token = data.token;
  }

}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}
