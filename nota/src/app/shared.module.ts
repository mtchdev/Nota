/**
 * Components
 */
import { AppComponent } from './app.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

/**
 * Providers
 */
import { AuthService } from './components/auth/auth.service';
import { AppService } from './app.service';
import { HttpService } from './providers/http.service';
import { HttpErrorInterceptor } from './providers/http.interceptor';

/**
 * Imports
 */
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

export const MODULES: Array<any> = [
    AppComponent,
    OnboardingComponent,
    RegisterComponent,
    LoginComponent
];

export const PROVIDERS: Array<any> = [
    AuthService,
    HttpService,
    AppService,
    HttpService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
    }
];

export const IMPORTS: Array<any> = [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
];
