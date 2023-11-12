import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { PersonalComponent } from './personal/personal.component';
import { AccountComponent } from './account/account.component';
import { WorkComponent } from './work/work.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    PersonalComponent,
    AccountComponent,
    WorkComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    RouterModule.forChild([
        {path:'',component: RegistrationComponent, children:[
				{path:'', redirectTo: 'account', pathMatch: 'full'},
				{path: 'personal', component: PersonalComponent},
				{path: 'account', component: AccountComponent},
				{path: 'work', component: WorkComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class RegistrationModule { }
