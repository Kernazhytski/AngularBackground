import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import {TokenStorageService} from "../auth/token-storage.service";
import { Probe } from '../entities/Probe';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit{
  info: any;
  probes!: Probe[];
  probesLib!: Probe[];
  errorMessage!: string;

  constructor(private token: TokenStorageService,private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    delay(500)
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      roles: this.token.getAuthorities()
    };

    this.userService.getProbesBoard().subscribe(
      data =>{
        this.probesLib = data;
        this.probes = Object.assign([],this.probesLib)
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  delete(id:number){
    this.userService.deleteProbe(id);
    window.location.reload();
  }

  search(s:string){
    this.probes = []
    if(s.length==0){
      this.probes = this.probesLib
    }
    else{
      this.probesLib.forEach(p => {
        if (p.name.includes(s) ||
          p.model.includes(s) ||
          p.type.includes(s) ||
          p.unit.includes(s) ||
          p.range_to.toString().includes(s) ||
          p.range_from.toString().includes(s) ||
          p.location.includes(s) ||
          p.description.includes(s))
        {
          this.probes.push(p);
          console.log(this.probes)
        }
      })
    }

  }
}
