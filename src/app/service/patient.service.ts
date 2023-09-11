import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url: string = `${environment.HOST}/patients`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }
}
