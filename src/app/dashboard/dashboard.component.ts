import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from 'app/service/computer.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

export interface LanguageDropDownOption {
  language: string,
  class: string,
  text: string
}

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

  languageDropDownOptions: LanguageDropDownOption[] = [
    { language: "fr", class: "flag-icon flag-icon-fr", text: "French" },
    { language: "en", class: "flag-icon flag-icon-us", text: "English" }
  ]
  currentOption: LanguageDropDownOption;


  constructor(
    private computerService: ComputerService,
    private router: Router,
    private translate: TranslateService) {

    // Navigation to the same link (here, "dashboard") will refresh the page
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
    });

    this.setLanguage(environment.default_language)

    for (let option of this.languageDropDownOptions) {
      if (option.language === environment.default_language) {
        this.currentOption = option;
        break;
      }
    }
  }

  ngOnInit() {
    this.computerService.getComputers().subscribe(
      data => this.dataSource = data,
      err => console.log('err: ', err),
      () => console.log('Completed'),
    )
  }

  setLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }

  changeLanguage(option: LanguageDropDownOption) {
    if (this.currentOption.language !== option.language) {
      this.currentOption = option;
      this.setLanguage(this.currentOption.language)
    }
  }

  getOtherLanguages(): LanguageDropDownOption[] {
    return this.languageDropDownOptions.filter(option => option.language !== this.currentOption.language)
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
    this.setLanguage('fr')
    console.log("Add computer called");
  }

  editComputer(computer: any) {
    console.log("Edit computer called");
  }

  deleteComputer() {
    this.setLanguage('en')
    console.log("Delete Computer called");
  }
}
