import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {delay} from 'rxjs/internal/operators/delay';
import {TokenStorageService} from "../auth/token-storage.service";
import {Probe} from '../entities/Probe';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {
  info: any;
  probes: Probe[] = [];
  probesLib!: Probe[];
  errorMessage!: string;
  page!: number;
  Lib!:Probe[];
  b1 = 1;
  b2 = 2;
  b3 = 3;
  h2 = true;
  h3 = true;

  constructor(private token: TokenStorageService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.page = 1;
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      roles: this.token.getAuthorities()
    };

    this.userService.getProbesBoard().subscribe(
      data => {
        this.probesLib = data;
        this.Lib = this.probesLib;
        if (this.probesLib.length < 5) {
          this.probes = this.probesLib;
        } else {
          this.probes.push(this.probesLib[0])
          this.probes.push(this.probesLib[1])
          this.probes.push(this.probesLib[2])
          this.probes.push(this.probesLib[3])
        }
        if(this.probesLib.length<5){
          this.h2 = false;
          this.h3 = false;
        }
        else if (this.probesLib.length<9){
          this.h3 = false;
        }
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

  delete(id: number) {
    this.userService.deleteProbe(id);
    window.location.reload();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.probes = []
      for (let i = 4; i > 0; i--) {
        this.probes.push(this.Lib[4 * this.page - i])
      }
      if (this.Lib.length>8){
        this.h3=true;
      }
      if(this.page!=1){
        this.b1--;this.b2--;this.b3--;
      }
    }


  }

  next() {
    if (this.page * 4 < this.Lib.length) {
      this.page++;
      console.log(this.page)
      this.probes = []
      if (this.Lib.length - this.page * 4 >= 0) {
        for (let i = 4; i > 0; i--) {
          this.probes.push(this.Lib[4 * this.page - i])
        }
      }else{
        for(let i =4;i > (this.page * 4 - this.Lib.length);i--){
          this.probes.push(this.Lib[4 * this.page - i])
          this.h3=false
        }
      }
      if(this.page>2){
        this.b1++;this.b2++;this.b3++;
      }
    }


  }

  b_1() {
      this.prev()
  }

  b_2() {
    if (this.b2==2 && this.page==1){
      this.next()
    }
  }

  b_3() {
    if(this.page==1){
      this.next()
      this.next()
    }
    else{
      this.next()
    }
  }

  search(s: string) {
    this.probes = []
    this.Lib = []
    if (s.length == 0) {
      this.Lib = this.probesLib;
      this.insert()
    } else {
      this.probesLib.forEach(p => {
        if (p.name.includes(s) ||
          p.model.includes(s) ||
          p.type.includes(s) ||
          p.unit.includes(s) ||
          p.range_to.toString().includes(s) ||
          p.range_from.toString().includes(s) ||
          p.location.includes(s) ||
          p.description.includes(s)) {
          this.Lib.push(p);
        }
      })
      this.insert()
      }
    if(this.Lib.length<5){
      this.h2 = false;
      this.h3 = false;
    }
    else if (this.Lib.length<9){
      this.h3 = false;
    }
    else{
      this.h2 = true;
      this.h3 = true;
    }
    this.b1=1;this.b2=2;this.b3=3;this.page=1;
    }

    insert(){
      if(this.Lib.length>=4){
        this.probes.push(this.Lib[0])
        this.probes.push(this.Lib[1])
        this.probes.push(this.Lib[2])
        this.probes.push(this.Lib[3])
      }else{
        for (let i = 0;i < this.Lib.length;i++){
          this.probes.push(this.Lib[i])
        }
    }
  }
}
