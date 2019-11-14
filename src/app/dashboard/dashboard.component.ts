import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'app/service/computer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'company']

  dataSource: any;
  searchText = "";
  // checked = false;
  // deleteModeOn = false;

  constructor(
    private computerService: ComputerService,
    private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
    });

  }

  ngOnInit() {
    this.computerService.getComputers().subscribe(
      data => this.dataSource = data,
      err => console.log('err: ', err),
      () => console.log('Completed'),
    )
  }

  // toggleDeleteMode() {
  //   this.deleteModeOn = !this.deleteModeOn;
  // }

  search() {

    console.log("Search computer called");
    if (!this.searchText.trim()) {
      return;
    }
    this.computerService.getComputersByName(this.searchText).subscribe(
      (data) => this.dataSource = data,
      (err) => console.log("Getting computers by name failure!"),
      () => console.log("Getting computers by name completed.")
    );
  }

  addComputer() {
    console.log("Add computer called");
  }

  editComputer(computer: any) {
    console.log("Edit computer called");
  }

  deleteComputer() {
    console.log("Delete Computer called");
  }
}
