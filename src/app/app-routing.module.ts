import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../routes/sign-in/sign-in.component';
import { SignUpComponent } from '../routes/sign-up/sign-up.component';
import { ProfileComponent } from 'src/routes/profile/profile.component';
import { NotFoundComponent } from 'src/routes/not-found/not-found.component';
import { DashboardComponent } from 'src/routes/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../routes/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/routes/reset-password/reset-password.component';
import { ProfileViewComponent } from 'src/routes/profile-view/profile-view.component';
import { CoursesComponent } from 'src/routes/courses/courses.component';
import { CourseDetailsComponent } from 'src/routes/course-details/course-details.component';
import { PaymentComponent } from 'src/routes/payment/payment.component';
import { EventsComponent } from 'src/routes/events/events.component';
import { TicketComponent } from 'src/routes/ticket/ticket.component';
import { EventDetailsComponent } from 'src/routes/events-details/event-details.component';
import  { BlogComponent } from 'src/routes/blog/blog.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-profile', component: ProfileComponent},
  { path: 'profile', component: ProfileViewComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course-details', component: CourseDetailsComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'blog', component: BlogComponent},
  { path: 'tickets', component: TicketComponent},
  { path: 'events', component: EventsComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'event-details', component: EventDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
