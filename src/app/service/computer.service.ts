import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const backend_url = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private http: HttpClient) { }

  getComputers(): Observable<any> {
    return this.http.get(`${backend_url}/computer/get-all`)
  }

  createComputer(computer: any): Observable<any> {
    return this.http.post(`${backend_url}/computer/create`, computer);
  }

  getComputersByName(name: string): Observable<any> {
    return this.http.get(`${backend_url}/computer/find-by-name/${name}`)
  }

  updateComputer(computer: any): Observable<any> {
    return this.http.post(`${backend_url}/computer/update`, computer);
  }
}
