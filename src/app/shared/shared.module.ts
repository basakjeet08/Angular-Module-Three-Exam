import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { IncidentCardComponent } from './components/incident-card/incident-card.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'primeng/button';

// These are the required Prime Ng Template Components
const PrimeNgModules = [ButtonModule];

@NgModule({
  declarations: [
    LoaderComponent,
    ErrorCardComponent,
    IncidentCardComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, PrimeNgModules],
  exports: [
    LoaderComponent,
    ErrorCardComponent,
    IncidentCardComponent,
    HeaderComponent,
    PrimeNgModules,
  ],
})
export class SharedModule {}
