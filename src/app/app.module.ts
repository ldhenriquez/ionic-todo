import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AppInitService } from './core/app-init.service';
import { registerIcons } from './core/ionicons';
import { NoReuseStrategy } from './core/no-reuse.strategy';
import { TASKS_REPOSITORY, CATEGORIES_REPOSITORY } from './core/di/repository.tokens';
import { TasksRepositoryImpl } from './data/repositories/tasks.repository.impl';
import { CategoriesRepositoryImpl } from './data/repositories/categories.repository.impl';

export function initApp(appInit: AppInitService) {
  return async () => {
    registerIcons();
    await appInit.init();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Router animations are disabled to avoid occasional overlay / pointer-events
    // issues in some Chromium builds when running Ionic inside a standard web
    // server (ng serve). Mobile builds remain unaffected.
    IonicModule.forRoot({ swipeBackEnabled: false, animated: false }),
    IonicStorageModule.forRoot({
      name: '__todo',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    AppRoutingModule,
  ],
  providers: [
    // Avoid stacked/hidden pages in the DOM (prevents click-blocking overlays)
    { provide: RouteReuseStrategy, useClass: NoReuseStrategy },
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppInitService], multi: true },
    // Bind repository interfaces to concrete implementations
    { provide: TASKS_REPOSITORY, useExisting: TasksRepositoryImpl },
    { provide: CATEGORIES_REPOSITORY, useExisting: CategoriesRepositoryImpl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
