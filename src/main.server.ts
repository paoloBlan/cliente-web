import { bootstrapApplication } from '@angular/platform-browser';
import { ClienteListComponent } from './app/components/cliente-list/cliente-list.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(ClienteListComponent, config);

export default bootstrap;
