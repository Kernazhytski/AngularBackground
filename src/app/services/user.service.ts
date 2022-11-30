import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Probe } from '../entities/Probe';
import { TokenStorageService } from '../auth/token-storage.service';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tableUrl = 'http://localhost:8088/api/table';
  private editUrl = 'http://localhost:8088/table/edit';
  private addUrl = 'http://localhost:8088/table/add';

  constructor(private http: HttpClient,private token: TokenStorageService) { }






  getProbesBoard() {
    console.log("------")
    return this.http.get<Probe[]>(this.tableUrl);
  }

  getAddBoard(): Observable<string> {
    return this.http.get(this.addUrl, { responseType: 'text' });
  }

  getGetBoard(): Observable<string> {
    return this.http.get(this.editUrl, { responseType: 'text' });
  }
}
