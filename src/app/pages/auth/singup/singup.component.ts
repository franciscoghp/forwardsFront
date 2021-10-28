import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  form!: FormGroup;
  errorMessage: boolean = false;
  successMessage: boolean = false;
  message: any;
  constructor(
    private authService: AuthService, 
    public formBuilder: FormBuilder,
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
      confirm_password: [
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

  register() {
    const { email, password, confirm_password } = this.form.value;
    if(password != confirm_password ) {
      this.errorMessage = true;
      this.successMessage = false;
      this.message = 'The passwords do not match each other'
    }
    else{
      let data: any = {};
      data.email = email;
      data.pass = password;
      this.authService.signup(data).subscribe((res: any) => {
        this.form.reset();
        this.successMessage = true;
        this.errorMessage = false;
      }, error => {
        this.errorMessage = true;
        this.successMessage = false;
        this.successMessage = false;
        this.message = error.error.msg
      })
    }
  }

}
