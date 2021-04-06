import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarsService} from '../../service/cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerEntity} from '../../service/interfaces';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.scss']
})
export class EditOwnerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      aFirstName: [null, [Validators.required]],
      aLastName: [null, [Validators.required]],
      aMiddleName: [null, [Validators.required]],
      aCars: this.formBuilder.array([])
    });

    const ownerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (ownerId) {
      this.pacthOwnerForm(ownerId);
    }
    console.log(ownerId); // todo delete
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

  private pacthOwnerForm(id) {
    this.carsService.getOwnerById(id).subscribe(res => {
      console.log(res);
      this.form.patchValue(res)
    })
  }

  public update(): void {
    if (this.form.invalid) {
      return;
    }

    const owner: OwnerEntity = {
      aFirstName: this.form.value.aFirstName,
      aLastName: this.form.value.aLastName,
      aMiddleName: this.form.value.aMiddleName,
      aCars: this.form.value.aCars,
    }

    this.carsService.createOwner(owner).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
    })
  }
}
