import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbarComponent } from './components/headerbar/headerbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderbarComponent, SidebarComponent],
  imports: [
    CommonModule
  ],
  exports : [HeaderbarComponent, SidebarComponent]
})
export class BaseModule { }
