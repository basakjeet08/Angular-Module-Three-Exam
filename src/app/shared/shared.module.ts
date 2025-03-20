import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';

@NgModule({
  declarations: [LoaderComponent, ErrorCardComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, ErrorCardComponent],
})
export class SharedModule {}
