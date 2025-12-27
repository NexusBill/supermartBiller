import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private http: HttpClient,private toastr: ToastrService) { }
  @Output() tenantSelected = new EventEmitter<string>();

  loginData = {
    id: '',
    pass: ''
  };
  setStorage(id: string) {
    localStorage.setItem('clientCode', id);
  }

  login() {
    if (!this.loginData.id || !this.loginData.pass) {
      this.toastr.error('Please enter both ID and Password');
      return;
    }
    this.http.post('https://supermartspring.vercel.app/api/tenant/login', this.loginData).subscribe((response: any) => {
      this.toastr.success('Login successful');
      console.log('Login successful', response);
      this.setStorage(response.id);
      this.tenantSelected.emit(response.name);
    }, error => {
      this.toastr.error('Login failed');
      console.error('Login failed', error);
    });
  }
}
