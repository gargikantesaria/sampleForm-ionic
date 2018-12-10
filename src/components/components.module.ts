import { NgModule } from '@angular/core';
import { UserEmailComponent } from './user-email/user-email';
import { UserPasswordComponent } from './user-password/user-password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [UserEmailComponent,
    UserPasswordComponent],
	imports: [ FormsModule,ReactiveFormsModule,IonicModule ],
	exports: [UserEmailComponent,
    UserPasswordComponent]
})
export class ComponentsModule {}
