import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { authGuard } from '../shared/guard/auth.guard';
import { adminGuard } from './guard/admin.guard';

// These are the routes for the admin page
const adminRoutes: Routes = [
  { path: '', component: AdminComponent, canActivate: [authGuard, adminGuard] },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
