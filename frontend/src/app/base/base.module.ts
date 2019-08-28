import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRoutingModule } from './base.routing.module';

@NgModule({
  declarations: [HeaderbarComponent, SidebarComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    BaseRoutingModule
  ],
  exports : [HeaderbarComponent, SidebarComponent , HomeComponent]
})
export class BaseModule { }
