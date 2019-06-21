import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from '../routes/sign-in/sign-in.component';
import { SignUpComponent } from '../routes/sign-up/sign-up.component';
import { ProfileComponent } from '../routes/profile/profile.component';
import { NotFoundComponent } from '../routes/not-found/not-found.component';
import { DashboardComponent } from '../routes/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../routes/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../routes/reset-password/reset-password.component';
import { ProfileViewComponent } from '../routes/profile-view/profile-view.component';
import { CoursesComponent } from '../routes/courses/courses.component';
import { CourseDetailsComponent } from '../routes/course-details/course-details.component';
import { PaymentComponent } from '../routes/payment/payment.component';
import { EventsComponent } from '../routes/events/events.component';
import { TicketComponent } from '../routes/ticket/ticket.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    NotFoundComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileViewComponent,
    CoursesComponent,
    CourseDetailsComponent,
    PaymentComponent,
    EventsComponent,
    TicketComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
