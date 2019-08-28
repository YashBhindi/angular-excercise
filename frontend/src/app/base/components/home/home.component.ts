import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  carousalForm: FormGroup
  countryData: any[];
  cityData: any[];
  selectedListOfState: any[] = [];
  selectedCityIndex: number = 0;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.carousalForm = this.fb.group({
      countries: [''],
      cities: ['']
    });
    this.countryData = [{ c_id: 'IN', name: 'India' },
    { c_id: 'AU', name: 'Australia' },
    { c_id: 'US', name: 'United States' },
    { c_id: 'UK', name: 'United Kingdom' }
    ];
    this.cityData = [{ c_id: 'IN', name: 'Gujarat', image: 'assets/img/gujarat.jpg' },
    { c_id: 'IN', name: 'Rajasthan', image: 'assets/img/rajasthan.jpg' },
    { c_id: 'AU', name: 'Sydney', image: 'assets/img/sydney.jpg' },
    { c_id: 'AU', name: 'Melbourne', image: 'assets/img/melbourne.jpg' },
    { c_id: 'US', name: 'California', image: 'assets/img/california.jpg' },
    { c_id: 'US', name: 'Miami', image: 'assets/img/miami.jpg' },
    { c_id: 'US', name: 'London', image: 'assets/img/london.jpg' },
    { c_id: 'US', name: 'Oval', image: 'assets/img/oval.jpg' }
    ];
  }
  onChangeCountry(e) {
    this.selectedListOfState = [];
    let selectedCountry = this.countryData.filter((country) => {
      return country.name === e.target.value;
    });
    this.selectedListOfState = this.cityData.filter((city) => {
      return city.c_id === selectedCountry[0].c_id;
    });
    this.carousalForm.get('cities').setValue(this.selectedListOfState[0].name);
  }
  onChangeCity(index) {
    this.selectedCityIndex = index;
  }
  setIndex(index) {
    this.selectedCityIndex = index
    this.carousalForm.get('cities').setValue(this.selectedListOfState[this.selectedCityIndex].name)
  }
  gotoPrevious() {
    if (this.selectedCityIndex != 0) {
      console.log("In if", this.selectedCityIndex);
      this.selectedCityIndex = this.selectedCityIndex - 1;
      this.carousalForm.get('cities').setValue(this.selectedListOfState[this.selectedCityIndex].name)
      console.log("In if last", this.selectedCityIndex);
    }
    else {
      console.log("In else", this.selectedCityIndex);
      this.selectedCityIndex = this.selectedListOfState.length - 1;
      this.carousalForm.get('cities').setValue(this.selectedListOfState[this.selectedCityIndex].name)
      console.log("In else last", this.selectedCityIndex);
    }
  }
  gotoNext() {
    if (this.selectedCityIndex != this.selectedListOfState.length - 1) {
      console.log("In if", this.selectedCityIndex);
      this.selectedCityIndex = this.selectedCityIndex + 1;
      this.carousalForm.get('cities').setValue(this.selectedListOfState[this.selectedCityIndex].name)
      console.log("In if last", this.selectedCityIndex);
    }
    else {
      console.log("In else", this.selectedCityIndex);
      this.selectedCityIndex = 0;
      this.carousalForm.get('cities').setValue(this.selectedListOfState[this.selectedCityIndex].name)
      console.log("In else last", this.selectedCityIndex);
    }
  }

}
