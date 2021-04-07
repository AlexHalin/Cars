import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {CarsService} from '../../service/cars.service';
import {OwnerEntity} from '../../service/interfaces';
import { Router, RouterModule } from '@angular/router';

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

  showForm(owner) {
    this.router.navigate([`/edit/${owner.id}`]);
  }

  getOwners() {
    this.carsSub = this.carsService.getOwners().subscribe((owners: OwnerEntity[]) => {
      this.owners = owners;
      this.dataSource = new MatTableDataSource(this.owners);
    });
  }
}
