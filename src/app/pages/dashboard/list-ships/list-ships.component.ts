import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from 'src/app/services/ship/ship.service';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['./list-ships.component.css']
})
export class ListShipsComponent implements OnInit {
  user_id: any;
  ships: any;
  successMessage: boolean = false
  id: any;

  constructor(
    private shipService: ShipService,
    public router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params.id;
   }

  ngOnInit(): void {
    this.getShips();
  }

  getShips(){
    this.shipService.getShips(this.id).subscribe((res)=>{
      this.ships = res.data
    })
  }

  remove(id: number){
    this.shipService.delete(id).subscribe((res)=>{
      this.successMessage = true;
      this.ngOnInit()
    })
  }
}
