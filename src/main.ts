import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Adjust the path as needed
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './app/request.interceptor';
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
     ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    })
    ),
     provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    provideRouter(routes) // 👈 Register routes here
  ]
}).catch((err) => console.error(err));