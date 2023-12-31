import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private patientService: PatientService
  ) {}
  
  ngOnInit(): void {
      this.patientService.findAll().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: any): void {
    this.dataSource.filter = event.target.value.trim();
  }

  deletePatient(id: number) {
    this.patientService.delete(id).subscribe(data => {
      console.log('Deleted')
    });
  }
}
