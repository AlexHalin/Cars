import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICarOwnersService, OwnerEntity} from './interfaces';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService implements ICarOwnersService{

  constructor(private http: HttpClient) { }

  createOwner(ownerEntity): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>(`/api/owners`, {...ownerEntity, id: Date.now()})
      .pipe(map((resp) => {
        return resp;
      }));
  }

  deleteOwner(aOwnerId: number): void {
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    // return this.http.patch<OwnerEntity>(`/api/owners/${aId}`);
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`/api/owners/${aId}`);
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(`/api/owners`);
  }
}

// aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]
