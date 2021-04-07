import {Observable} from 'rxjs';

export interface OwnerEntity {
  id?: number;
  aLastName: string;
  aFirstName: string;
  aMiddleName: string;
  aCars?: CarEntity[];
}

export interface CarEntity {
  aNumber: string;
  aBrand: string;
  aModel: string;
  aYear: string;
}

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;

  getOwnerById(aId: number): Observable<OwnerEntity>;

  createOwner(ownerEntity: OwnerEntity): Observable<OwnerEntity>;

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;

  deleteOwner(aOwnerId: number): void;
}
