import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Probe } from '../entities/Probe';
import { TokenStorageService } from '../auth/token-storage.service';
import { JwtResponse } from '../auth/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tableUrl = 'http://localhost:8088/api/table';
  private editUrl = 'http://localhost:8088/api/table/edit/';
  private addUrl = 'http://localhost:8088/api/table/add';

  constructor(private http: HttpClient,private token: TokenStorageService) { }

  getProbesBoard() {
    console.log("------")
    return this.http.get<Probe[]>(this.tableUrl);
  }

  getAddBoard() {
    return this.http.get<any[]>(this.addUrl);
  }

  getGetBoard(id:number){
    return this.http.get<any[]>(this.editUrl+id);
  }

  putEditBoard(probe:any, id:number){
    console.log('Post')
    this.http.post(this.editUrl+id,probe).subscribe()
  }

  putAddBoard(probe: Probe){
    return this.http.post(this.addUrl,probe).subscribe();
  }
}
