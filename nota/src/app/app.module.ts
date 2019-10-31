import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';

/**
 * Components
 */
// import { AppComponent } from './app.component';
import { MODULES, PROVIDERS, IMPORTS } from './shared.module';

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

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    HttpService,
    AppService,
    HttpService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
