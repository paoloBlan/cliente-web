import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ClienteListComponent } from './app/components/cliente-list/cliente-list.component';

bootstrapApplication(ClienteListComponent, appConfig)
  .catch((err) => console.error(err));
