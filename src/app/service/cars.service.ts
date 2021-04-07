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

  createOwner(ownerEntity): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>(`/api/owners`, {...ownerEntity, id: Date.now()})
      .pipe(map((resp) => {
        return resp;
      }));
  }

  deleteOwner(aOwnerId: number): Observable<void> {
    return this.http.delete<void>(`/api/owners/${aOwnerId}`);
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    console.log('OWNER', aOwner);
    return this.http.put<OwnerEntity>(`/api/owners/${aOwner.id}`, aOwner);
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`/api/owners/${aId}`);
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(`/api/owners`);
  }
}
