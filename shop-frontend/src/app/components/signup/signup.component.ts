import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CreateUserDto } from "../../services/authService/dto/create.user.dto";
import { AuthService } from "../../services/authService/auth.service";


@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log("formvalues", this.signupForm.value)
    if(this.signupForm.valid) {
      this.isLoading = true;
      const signUpData: CreateUserDto = this.signupForm.value;

      this.authService.createUser(signUpData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message;
          console.error(error);
        }
      })

    }
  };

}
