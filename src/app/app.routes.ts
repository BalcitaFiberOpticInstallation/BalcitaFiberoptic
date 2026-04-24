import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Services } from './services/services';
import { Clients } from './clients/clients';
import { Team } from './team/team';
import { Contact } from './contact/contact';
import { Portfolio } from './portfolio/portfolio';
import { Credentials } from './credentials/credentials';
import { Gallery } from './gallery/gallery';

export const routes: Routes = [
  { path: '',            redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',        component: Home },
  { path: 'about',       component: About },
  { path: 'services',    component: Services },
  { path: 'clients',     component: Clients },
  { path: 'team',        component: Team },
  { path: 'contact',     component: Contact },
  { path: 'portfolio',   component: Portfolio },
  { path: 'credentials', component: Credentials },
  { path: 'gallery',     component: Gallery },
];
