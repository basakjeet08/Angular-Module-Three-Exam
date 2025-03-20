import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { IncidentCardComponent } from './components/incident-card/incident-card.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ErrorCardComponent,
    IncidentCardComponent,
    HeaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    ErrorCardComponent,
    IncidentCardComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
