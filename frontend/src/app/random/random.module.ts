import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { RandomRoutingModule } from './random.routing.module';

@NgModule({
  declarations: [RandomNumberComponent],
  imports: [
    CommonModule,
    RandomRoutingModule
  ]
})
export class RandomModule { }
