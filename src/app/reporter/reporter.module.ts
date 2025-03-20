import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterComponent } from './reporter.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// These are the reported module routes
const reporterRoutes: Routes = [{ path: '', component: ReporterComponent }];

@NgModule({
  declarations: [ReporterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(reporterRoutes),
    FormsModule,
    SharedModule,
  ],
})
export class ReporterModule {}
