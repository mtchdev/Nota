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
import { InboxComponent } from './components/app/inbox/inbox.component';
import { OnboardingNotebookComponent } from './components/onboarding/notebook/notebook.component';

/**
 * Providers
 */
import { AuthService } from './components/auth/auth.service';
import { AppService } from './app.service';
import { HttpService } from './providers/http.service';
import { HttpErrorInterceptor } from './providers/http.interceptor';
import { AuthGuardService } from './providers/auth-guard.service';

/**
 * Imports
 */
import { AppRoutingModule } from './app-routing.module';
import { OnboardingRoutingModule } from './components/onboarding/onboarding-routing.module';
import { MainRoutingModule } from './components/app/main-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuillModule } from 'ngx-quill';
import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * Directives
 */
import { ModalDirectiveComponent } from './directives/modal/modal.directive';
import { ButtonRightSmallDirectiveComponent } from './directives/button/button-right-small.directive';
import { ColorPickerDirectiveComponent } from './directives/color-picker/color-picker.directive';
import { SidebarDirectiveComponent } from './directives/sidebar/sidebar.directive';
import { TitlebarDirectiveComponent } from './directives/titlebar/titlebar.directive';
import { NoteItemDirectiveComponent } from './directives/notes/note-item.directive';
import { EditorDirectiveComponent } from './directives/notes/editor.directive';
import { ContextNotebookDirectiveComponent } from './directives/context/context-notebook.directive';

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
    ButtonRightSmallDirectiveComponent,
    ColorPickerDirectiveComponent,
    InboxComponent,
    SidebarDirectiveComponent,
    TitlebarDirectiveComponent,
    NoteItemDirectiveComponent,
    EditorDirectiveComponent,
    ContextNotebookDirectiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    OnboardingRoutingModule,
    MainRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot(),
    DragDropModule
  ],
  providers: [
    AuthService,
    HttpService,
    AppService,
    HttpService,
    AuthGuardService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
