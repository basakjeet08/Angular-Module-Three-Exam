import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterComponent } from './reporter.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { authGuard } from '../shared/guard/auth.guard';
import { reporterGuard } from './guard/reporter.guard';

// These are the reported module routes
const reporterRoutes: Routes = [
  {
    path: '',
    component: ReporterComponent,
    canActivate: [authGuard, reporterGuard],
  },
];

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
