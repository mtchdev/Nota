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
import { HttpService } from './services/http.service';
import { AppService } from './app.service';

/**
 * Imports
 */
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export const MODULES: Array<any> = [
    AppComponent,
    OnboardingComponent,
    RegisterComponent,
    LoginComponent
];

export const PROVIDERS: Array<any> = [
    AuthService,
    HttpService,
    AppService
];

export const IMPORTS: Array<any> = [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
];
