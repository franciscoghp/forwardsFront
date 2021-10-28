import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: boolean = false;
  message: any;
  constructor(
    private authService: AuthService, 
    public formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
    });
  }

  login() {
    const { email, password } = this.form.value;
      let data: any = {};
      data.email = email;
      data.pass = password;
      this.authService.login(data).subscribe((res: any) => {
        this.form.reset();
        this.errorMessage = false;
        const user = {
          email: res.email,
          id: res.user_id
        }
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(user))
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }, error => {
        this.errorMessage = true;
        this.message = error.error.msg
      })

  }
}
