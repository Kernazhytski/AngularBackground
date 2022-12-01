import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Probe} from '../entities/Probe';
import {Types} from '../entities/Type';
import {Units} from '../entities/Unit';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  id: number;
  probe!: Probe[]
  types!: Types[]
  units!: Units[]
  errorMessage!: string;
  a!: any[];
  form: any = {};
  probeSubmit!: Probe;
  validation!:string;

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.userService.getGetBoard(this.id).subscribe(
      data => {
        //this.probe = data;
        this.a = data;
        this.units = this.a[0];
        this.types = this.a[1];
        this.probe = this.a[2];
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
    this.userService.putEditBoard(this.probeSubmit,this.id)
    this.router.navigate(['/table']);
    }
    else{
      this.validation="Check the entered params";
    }
  }


}
