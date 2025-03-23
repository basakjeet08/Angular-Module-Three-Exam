import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { IncidentCardComponent } from './components/incident-card/incident-card.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    LoaderComponent,
    IncidentCardComponent,
    HeaderComponent,
    ToastComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    IncidentCardComponent,
    HeaderComponent,
    ToastComponent,
  ],
})
export class SharedModule {}
