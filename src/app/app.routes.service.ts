
import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { ClientComponent } from 'app/views/client/client.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { ExtentionsComponent } from './views/extentions/extentions.component';
import { TrackComponent } from './views/track/track.component';
import { AllocatedComponent } from './views/allocated/allocated.component';
import { FleetComponent } from './views/fleet/fleet.component';
import { MovementComponent } from './views/movement/movement.component';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards' },
  {
    path: 'dashboards', children:
      [
        { path: '', component: Dashboard1Component },
      ]
  },
  {
    path: 'allocated', children:
      [
        { path: '', component: AllocatedComponent },
      ]
  },
  {
    path: 'movement', children:
      [
        { path: '', component: MovementComponent },
      ]
  },
  {
    path: 'fleet', children:
      [
        { path: '', component: FleetComponent },
      ]
  },
  {
    path: 'extentions', children:
      [
        { path: '', component: ExtentionsComponent },
      ]
  },
  {
    path: 'tables', children:
      [
        { path: 'table1', component: BasicTableComponent },
      ]
  },
  {
    path: 'track', children:
      [
        { path: '', component: TrackComponent },
      ]
  },
  { path: 'clients', children:
    [
      { path: '', component: ClientComponent},
    ]
  },
  { path: 'extentions', children:
    [
      { path: '', component: ExtentionsComponent},
    ]
  },
  {
    path: 'reservation', children:
      [
        { path: '', component: ReservationComponent },
      ]
  },
  { path: 'modals', component: ModalsComponent },
  { path: '**', component: NotFoundComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
