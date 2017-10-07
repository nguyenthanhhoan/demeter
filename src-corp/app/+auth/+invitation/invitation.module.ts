import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routing } from './invitation.routing';
import { InvitationComponent } from './invitation.component';
import { InvitationService } from './invitation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [InvitationComponent],
  providers: [
    InvitationService
  ]
})
export class InvitationModule { }
