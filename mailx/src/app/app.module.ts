import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { MODULES, PROVIDERS, IMPORTS } from './shared.module';

@NgModule({
  declarations: [
    ...MODULES
  ],
  imports: [
    ...IMPORTS
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
