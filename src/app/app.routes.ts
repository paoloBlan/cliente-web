import { Routes } from '@angular/router';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cliente-list', // Redirige a otro componente en lugar de usar AppComponent
        pathMatch: 'full'
        
    },
    {
        path: 'cliente-list',
        component: ClienteListComponent, // Componente para la lista de clientes
        
    },
    {
        path: 'cliente-form',
        component: ClienteFormComponent,
    
    },
]
