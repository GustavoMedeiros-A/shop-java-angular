import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReturnUserDto } from '../../services/authService/dto/return.user.dto';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  users: ReturnUserDto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.authService.fetchUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
        console.error(error);
      },
    });
  }

}
