import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerEntity} from '../../service/interfaces';
import {CarsService} from '../../service/cars.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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

    console.log(ownerId);

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

  public submit(): void {
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
