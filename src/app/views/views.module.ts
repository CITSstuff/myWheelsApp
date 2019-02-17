import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CalendarModule } from 'angular-calendar';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../main-layout/footer/footer.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { ModalsComponent } from './modals/modals.component';
import { TypographyComponent } from './css/typography/typography.component';
import { IconsComponent } from './css/icons/icons.component';
import { Map1Component } from './maps/map1/map1.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { GridComponent } from './css/grid/grid.component';
import { MediaObjectComponent } from './css/media-object/media-object.component';
import { UtilitiesComponent } from './css/utilities/utilities.component';
import { ImagesComponent } from './css/images/images.component';
import { ColorsComponent } from './css/colors/colors.component';
import { ShadowComponent } from './css/shadow/shadow.component';
import { Profile1Component } from './profile/profile1/profile1.component';
import { HelpComponent } from './help/help.component';
import { AllocatedComponent } from './allocated/allocated.component';
import { MovementComponent } from './movement/movement.component';
import { FleetComponent } from './fleet/fleet.component';
import { ExtentionsComponent } from './extentions/extentions.component';
import { TrackComponent } from './track/track.component';
import { ClientComponent } from './client/client.component';
import { ReservationComponent } from './reservation/reservation.component';
//import { MatAutocompleteModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import {MaterialModule} from './material-module';
import { DatePickerComponent } from 'app/components/date-picker/date-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    DatePickerComponent,
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    TypographyComponent,
    AllocatedComponent,
    IconsComponent,
    Map1Component,
    MovementComponent,
    FleetComponent,
    ExtentionsComponent,
    ClientComponent,
    ReservationComponent,
    TrackComponent,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    GridComponent,
    MediaObjectComponent,
    UtilitiesComponent,
    ImagesComponent,
    ColorsComponent,
    ShadowComponent,
    Profile1Component,
    HelpComponent,

  ],
  exports: [
    DatePickerComponent,
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    TypographyComponent,
    IconsComponent,
    Map1Component,
    StatsCardComponent,
    ReactiveFormsModule,
    StatsCard2Component,    
    Dashboard1Component,
    GridComponent,
    MediaObjectComponent,
    UtilitiesComponent,
    ImagesComponent,
    ColorsComponent,
    ShadowComponent,

  ],
  providers: [
  FormsModule,],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
