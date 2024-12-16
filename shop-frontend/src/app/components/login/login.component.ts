import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';
import { LoginDto } from '../../services/authService/dto/login.dto';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''
  isLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('LoginComponent initialized');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.isLoading = true;
      const loginData: LoginDto = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message;
          console.error(error);
        }
      })
    } else {
      this.errorMessage = 'Please fill in all required fields!';
    }
  }

}
