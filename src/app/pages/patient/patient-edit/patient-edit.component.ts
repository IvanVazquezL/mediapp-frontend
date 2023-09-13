import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker';
import { PatientService } from 'src/app/service/patient.service';


@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit{
  form : FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl(faker.person.firstName()),
      lastName: new FormControl(faker.person.lastName()),
      dni: new FormControl(faker.airline.flightNumber()),
      address: new FormControl(faker.location.streetAddress()),
      phone: new FormControl(faker.phone.number('501######')),
      email: new FormControl(faker.internet.email()),
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm():void {
    if(!this.isEdit) return;
    this.patientService.findById(this.id).subscribe(data => {
      this.form = new FormGroup({
        idPatient: new FormControl(data.idPatient),
        firstName: new FormControl(data.firstName),
        lastName: new FormControl(data.lastName),
        dni: new FormControl(data.dni),
        address: new FormControl(data.address),
        phone: new FormControl(data.phone),
        email: new FormControl(data.email)
      });
    });
  }

  operate(): void {
    if(this.isEdit) {
      this.patientService.update(this.id, this.form.value).subscribe(data => {
        console.log("Sucessful update");
      })
    } else {
      this.patientService.save(this.form.value).subscribe(data => {
        console.log("Succesful save");
      })
    }
  }
  
}
