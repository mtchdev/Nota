import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';

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
import { OnboardingRoutingModule } from './components/onboarding/onboarding-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Directives
 */
import { ModalDirectiveComponent } from './directives/modal/modal.directive';
import { OnboardingNotebookComponent } from './components/onboarding/notebook/notebook.component';
import { ButtonRightSmallDirectiveComponent } from './directives/button/button-right-small.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    RegisterComponent,
    LoginComponent,
    ModalDirectiveComponent,
    OnboardingNotebookComponent,
    ButtonRightSmallDirectiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    OnboardingRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
