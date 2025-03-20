import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterComponent } from './reporter.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { authGuard } from '../shared/guard/auth.guard';
import { reporterGuard } from './guard/reporter.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportComponent } from './pages/report/report.component';
import { IncidentsComponent } from './pages/incidents/incidents.component';

// These are the reported module routes
const reporterRoutes: Routes = [
  {
    path: '',
    component: ReporterComponent,
    canActivate: [authGuard, reporterGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'report', component: ReportComponent },
      { path: 'incidents', component: IncidentsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ReporterComponent,
    DashboardComponent,
    ReportComponent,
    IncidentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(reporterRoutes),
    FormsModule,
    SharedModule,
  ],
})
export class ReporterModule {}
