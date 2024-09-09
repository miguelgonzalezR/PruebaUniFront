import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'productos/editar/:id', component: EditComponent },
];
