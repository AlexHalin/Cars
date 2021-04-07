import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {OwnerEntity} from '../../service/interfaces';
import {CarsService} from '../../service/cars.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  years = [];

  // for edit route
  ownerId: string;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getYear()
    this.form = this.formBuilder.group({
      aFirstName: [null, [Validators.required]],
      aLastName: [null, [Validators.required]],
      aMiddleName: [null, [Validators.required]],
      aCars: this.formBuilder.array([])
    });

    // for edit route
    this.ownerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.ownerId) {
      this.pacthOwnerForm(this.ownerId);
    }
  }

  getYear() {
    const maxYear = new Date().getFullYear();
    const average = maxYear - new Date('1990').getFullYear();
    const num = maxYear - average;

    for (let i = maxYear; i >= num; i--) {
      this.years.push(i);
    }
    return this.years;
  }

  get cars(): FormArray {
    return this.form.get('aCars') as FormArray;
  }

  newCar(): FormGroup {
    return this.formBuilder.group({
      aNumber: [null, [Validators.required]],
      aBrand: [null, [Validators.required]],
      aModel: [null, [Validators.required]],
      aYear: [null, [Validators.required]],
    });
  }

  addCar() {
    this.cars.push(this.newCar());
  }

  removeCar(i: number) {
    this.cars.removeAt(i);
  }

  // for edit part
  private pacthOwnerForm(id) {
    this.carsService.getOwnerById(id).subscribe(res => {
      this.form.patchValue(res);

      for (const car of res.aCars) {
        this.cars.push(
          this.formBuilder.group({
            aNumber: [car.aNumber, [Validators.required]],
            aBrand: [car.aBrand, [Validators.required]],
            aModel: [car.aModel, [Validators.required]],
            aYear: [car.aYear, [Validators.required]],
          })
        )
      }
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const owner: OwnerEntity = {
      aFirstName: this.form.value.aFirstName,
      aLastName: this.form.value.aLastName,
      aMiddleName: this.form.value.aMiddleName,
      aCars: this.form.value.aCars,
    };

    this.carsService.createOwner(owner).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
    });
  }

  // for edit route
  update() {
    if (this.form.invalid) {
      return;
    }

    const owner: OwnerEntity = {
      id: +this.ownerId,
      aFirstName: this.form.value.aFirstName,
      aLastName: this.form.value.aLastName,
      aMiddleName: this.form.value.aMiddleName,
      aCars: this.form.value.aCars,
    };

    this.carsService.editOwner(owner).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
    });
  }

  remove() {
    this.carsService.deleteOwner(+this.ownerId).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
