import { Component, OnInit } from '@angular/core';
import { Probe } from '../entities/Probe';
import { Types } from '../entities/Type';
import { Units } from '../entities/Unit';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit{
  types!: Types[]
  units!: Units[]
  errorMessage!: string;
  a!: any[];
  form: any = {};
  probeSubmit!: Probe;
  validation!:string;

  constructor(private userService: UserService,private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAddBoard().subscribe(
      data => {
        //this.probe = data;
        this.a = data;
        this.units = this.a[0];
        this.types = this.a[1];
        console.log(this.units)
        console.log(this.types)
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

  cancel() {
    this.router.navigate(['/table']);
  }

  onSubmit(name: string,
           location:string,
           type:string,
           description:string,
           model:string,
           unit:string,
           range_from:string,
           range_to:string){
    this.validation=""
    this.probeSubmit = new Probe(0,
      name,
      location,
      type,
      description,
      model,
      unit,
      Number(range_from),
      Number(range_to))
    if(range_to>range_from &&
      name.length > 0 &&
      name.length <= 30 &&
      location.length <=40 &&
      description.length <=200 &&
      model.length <= 15 &&
      model.length > 0
    ){
      this.userService.putAddBoard(this.probeSubmit)
      this.router.navigate(['/table']);
    }
    else{
      this.validation="Check the entered params";
    }
  }
}
