import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './home-container.component';
import { HomeOpcion2Component } from './home-opcion2/home-opcion2.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [HomeComponent, HomeContainerComponent, HomeOpcion2Component],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
