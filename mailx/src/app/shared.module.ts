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
export const MODULES: Array<any> = [
    AppComponent,
    OnboardingComponent,
    RegisterComponent,
    LoginComponent
];

export const PROVIDERS: Array<any> = [
    AuthService,
    HttpService
];
