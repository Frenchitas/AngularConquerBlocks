import { CustomInputComponent } from '@/app/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { afterNextRender, inject } from '@angular/core';
import { AuthService, LocalManagerService } from '@/app/services';
import { passwordMatchValidator } from '@/app/validators';
import { firstValueFrom, VirtualAction } from 'rxjs';
import { Router } from '@angular/router';
import { appRoutes } from '@/app/app.routes';

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  authService = inject(AuthService)
  route = inject(Router)

  registerForm = new FormGroup<RegisterForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
  }, { validators: passwordMatchValidator })

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const toSend = {
          email: this.registerForm.getRawValue().email,
          password: this.registerForm.getRawValue().password
        }

        await firstValueFrom(this.authService.register(toSend));
        this.route.navigate([appRoutes.public.login], { replaceUrl: true });
      } catch (error) {
        console.error(error)
      }

      this.registerForm.reset()
    }
  }
}  
