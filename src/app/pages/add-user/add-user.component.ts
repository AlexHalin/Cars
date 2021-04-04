import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      aLastName: [null, [Validators.required]],
      aFirstName: [null, [Validators.required]],
      aMiddleName: [null, [Validators.required]],
      aCars: this.formBuilder.array([])
    });
  }

  get cars(): FormArray {
    return this.form.get('aCars') as FormArray;
  }

  newCar(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required]],
    });
  }

  addCar() {
    this.cars.push(this.newCar());
  }

  removeCar(i: number) {
    this.cars.removeAt(i);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    console.log(this.form.value);
    this.submitted = false;
  }

}
