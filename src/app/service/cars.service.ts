import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarEntity, ICarOwnersService, OwnerEntity} from './interfaces';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService implements ICarOwnersService{

  constructor(private http: HttpClient) { }

  createOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.post(`/api/owners`, {...aOwner, id: Date.now()})
      .pipe(map((resp) => {
        console.log(resp);
        return {
          ...aOwner,
        }

      }))
  }

  deleteOwner(aOwnerId: number): void {
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return undefined;
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return undefined;
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get(`/api/owners`)
  }
}

// aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]
