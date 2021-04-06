import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {CarsService} from '../../service/cars.service';
import {OwnerEntity} from '../../service/interfaces';
import {Router} from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['aLastName', 'aFirstName', 'aMiddleName', 'aCars'];
  carsSub: Subscription;
  owners: OwnerEntity[];
  dataSource;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private carsService: CarsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getOwners();
  }

  showForm(event) {
    console.log('this will be routing form', event);
  }

  getOwners() {
    this.carsSub = this.carsService.getOwners().subscribe((owners: OwnerEntity[]) => {
      this.owners = owners;
      this.dataSource = new MatTableDataSource(this.owners);
      console.log(this.owners);
    });
  }
}
