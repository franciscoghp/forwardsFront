import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_id: any;
  companies: any;
  successMessage: boolean = false

  constructor(
    private companyService: CompanyService
  ) {
    const user: any = localStorage.getItem('user')
    this.user_id = JSON.parse(user).id
   }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.companyService.getCompanies(this.user_id).subscribe((res)=>{
      this.companies = res.data
    })
  }

  remove(id: number){
    this.companyService.delete(id).subscribe((res)=>{
      this.successMessage = true;
      this.ngOnInit()
    })
  }
}
