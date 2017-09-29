import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './post.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './_form/post-form.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../../../_shared/shared.module';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    ListComponent,
    FormComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
  ],
})
export class PostModule {

}
