import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from 'src/app/services/ship/ship.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  form!: FormGroup;
  errorMessage: boolean = false;
  successMessage: boolean = false;
  message: any;
  company_id: any
  edit: boolean = false;
  watching: boolean = false;
  prize: number = 100
  constructor(
    public formBuilder: FormBuilder,
    private shipsService: ShipService,
    public router: ActivatedRoute
  ) {
    this.company_id = this.router.snapshot.params.id;
    const editRoute = this.router.snapshot.url[0].path;
    if(editRoute === 'edit_ship') this.edit = true
   }

   ships = [
    "Antong Holdings",
    "CMA CGM",
    "Cosco Shipping",
    "Evergreen Line",
    "Hamburg Sud",
    "Hapag-Lloyd",
    "Hyundai",
    "IRISL Group",
    "KMTC",
    "Maersk",
    "MSC",
    "One",
   ]
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      company_id: [ this.company_id ],
      bill_landing: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.required,
        ]),
      ],
      containers: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      arrival_date: [
        '',
        Validators.compose([
          Validators.pattern(/^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      departure_date: [
        '',
        Validators.compose([
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      prize: [
        {value: this.prize, disabled: true},
        Validators.compose([
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(12),
          Validators.minLength(4),
          Validators.required,
        ]),
      ],
      ship: [
        '', Validators.required
      ],
    });

    this.form.controls.containers.valueChanges.subscribe((res)=>{
      const prize = this.prize * res
      this.form.controls.prize.setValue(prize)
    });

    if(this.company_id && this.edit) this.editMode();
    if(this.watching) this.watchingForm()
  }

  watchingForm(){
    this.form.disable()
  }

  register(){
    if(!this.edit){
      this.shipsService.postShip(this.form.value).subscribe((res) =>{
        this.successMessage = true;
        this.message = res.msg
      })
    }
  }

  editShip(){
    this.shipsService.update(this.company_id, this.form.value).subscribe((res) =>{
      this.successMessage = true
      this.message = res.msg;
    })
  }

  editMode(){
    if(!this.watching) this.edit = true;
    this.shipsService.getShip(this.company_id).subscribe( (res) => {
      const arrival = res.data[0].arrival_date.split('T')[0]
      this.form.controls.bill_landing.setValue(res.data[0].bill_landing);
      this.form.controls.arrival_date.setValue(arrival);
      this.form.controls.departure_date.setValue(res.data[0].departure_date);
      this.form.controls.containers.setValue(res.data[0].containers);
      this.form.controls.ship.setValue(res.data[0].ship);
    })
  }

}
