import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  form!: FormGroup;
  errorMessage: boolean = false;
  successMessage: boolean = false;
  message: any;
  user_id: any
  id: any;
  edit: boolean = false;
  watching: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private companyService: CompanyService,
    public router: ActivatedRoute
  ) {
    const user: any = localStorage.getItem('user')
    this.user_id = JSON.parse(user).id;
    this.id = this.router.snapshot.params.id;
    const companyRoute = this.router.snapshot.url[0].path;
    if(companyRoute === 'company') this.watching = true;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_id: [ this.user_id ],
      contact_email: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.required,
        ]),
      ],
      contact_name: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      name: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      nit: [
        '',
        Validators.compose([
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
    });
    if(this.id) this.editMode();
    if(this.watching) this.watchingForm()
  }

  register(){
    if(!this.edit){
      this.companyService.postCompany(this.form.value).subscribe((res)=>{
        this.errorMessage = false;
        this.successMessage = true;
        this.message = res.msg
      }, error =>{
        console.log(error)
        this.errorMessage = true;
        this.successMessage = false;
        this.message = error.msg
      })
    }
  }

  editMode(){
    if(!this.watching) this.edit = true;
    this.companyService.getCompany(this.id).subscribe( (res) => {
      this.form.controls.nit.setValue(res.data[0].nit);
      this.form.controls.name.setValue(res.data[0].name);
      this.form.controls.contact_name.setValue(res.data[0].contact_name);
      this.form.controls.contact_email.setValue(res.data[0].contact_email);
    })
  }

  editCompany(){
    this.companyService.update(this.id, this.form.value).subscribe((res) =>{
      this.successMessage = true
      this.message = res.msg;
    })
  }

  watchingForm(){
    this.form.disable()
  }
}
