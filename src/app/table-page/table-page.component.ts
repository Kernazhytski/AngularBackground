import {Component, OnInit} from '@angular/core';
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
  errorMessage!: string;

  constructor(private token: TokenStorageService,private userService: UserService) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      roles: this.token.getAuthorities()
    };

    this.userService.getProbesBoard().subscribe(
      data =>{
        this.probes = data;
        console.log(this.probes, data)
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
}
