import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WeatherHttpService} from "../weather-http.service";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [DecimalPipe]
})
export class DisplayComponent implements OnInit{

  cityName;
  cityCountry;
  cityDescription;
  cityTemp;
  cityMaxTemp;
  cityMinTemp;
  cityIcon;

  newDate;

  forecastData1;
  forecastData2;
  forecastData3;
  forecastData4;

  forecastImg1;
  forecastImg2;
  forecastImg3;
  forecastImg4;

  forecastTemperature1;
  forecastTemperature2;
  forecastTemperature3;
  forecastTemperature4;

  dateTime = Date.now();

  @ViewChild('weatherForm') weatherForm: NgForm;

  constructor(private weatherHttpService: WeatherHttpService, private pipe: DecimalPipe) {
  }

  /*This function subscribes to current location of user and fires onGetCurrentPositionWeather with user city as parameter (1)*/
  ngOnInit() {
    this.weatherHttpService.getCurrentLocation().subscribe(
      (city) => {
        this.onGetCurrentPositionWeather(city.city, city.country)
      });

  }

  /*This function fires getWeather, getWeatherForecast & getTodayWeather functions and subscribes to the result, populating html template with response weather data (3)*/
  onGetCurrentPositionWeather (cityName: string, countryCode: string) {
    this.weatherForm.reset();
    this.weatherHttpService.getWeather(cityName).subscribe(
      (response) => {
        this.cityName = response.name;
        this.cityCountry = response.sys.country;
        this.cityDescription = response.weather[0].description;
        this.cityTemp = this.pipe.transform(response.main.temp, '1.0-0') + '°C';
        this.cityIcon = "http://openweathermap.org/img/w/"+ response.weather[0].icon + ".png";
        this.appendImgByWeather(response.weather[0].id);
        console.log(response);
      } );
    this.weatherHttpService.getWeatherForecast(cityName, countryCode).subscribe(
      (response) => {

        this.forecastData1 = response.list[0].dt_txt;
        this.forecastImg1 = "http://openweathermap.org/img/w/"+ response.list[0].weather[0].icon + ".png";
        this.forecastTemperature1 = this.pipe.transform(response.list[0].main.temp, '1.0-0') + '°C';

        this.forecastData2 = response.list[1].dt_txt;
        this.forecastImg2 = "http://openweathermap.org/img/w/"+ response.list[1].weather[0].icon + ".png";
        this.forecastTemperature2 = this.pipe.transform(response.list[1].main.temp, '1.0-0') + '°C';

        this.forecastData3 = response.list[2].dt_txt;
        this.forecastImg3 = "http://openweathermap.org/img/w/"+ response.list[2].weather[0].icon + ".png";
        this.forecastTemperature3 = this.pipe.transform(response.list[2].main.temp, '1.0-0') + '°C';

        this.forecastData4 = response.list[3].dt_txt;
        this.forecastImg4 = "http://openweathermap.org/img/w/"+ response.list[3].weather[0].icon + ".png";
        this.forecastTemperature4 = this.pipe.transform(response.list[3].main.temp, '1.0-0') + '°C';

        console.log(response);

        this.newDate = new Date(this.forecastData4);

      }
    )
    this.weatherHttpService.getTodayWeather(cityName, countryCode).subscribe(
      (response) => {
        console.log(response);
        this.cityMaxTemp = 'max ' + this.pipe.transform(response.list[0].temp.max, '1.0-0') + '°C';
        this.cityMinTemp = 'min ' + this.pipe.transform(response.list[0].temp.min, '1.0-0') + '°C';
      }
    )
  }

/*This function appends background images according to the weather code received from Open Weather API*/
  appendImgByWeather(response) {
    if (response >= 200 && response <= 232) {
      document.body.style.backgroundImage= "url('../assets/img/thunderstorm.jpg')";
    } else if (response >= 300 && response <= 321) {
      document.body.style.backgroundImage= "url('../assets/img/rain.jpg')";
    } else if (response >= 500 && response <= 531) {
      document.body.style.backgroundImage= "url('../assets/img/rain.jpg')";
    } else if (response >= 600 && response <= 622) {
      document.body.style.backgroundImage= "url('../assets/img/snow.jpg')";
    } else if (response >= 701 && response <= 781) {
      document.body.style.backgroundImage= "url('../assets/img/fog.jpg')";
    } else if (response === 800) {
      document.body.style.backgroundImage= "url('../assets/img/clearsky.jpg')";
    } else if (response === 801 || response === 802) {
      document.body.style.backgroundImage= "url('../assets/img/fewclouds.jpg')";
    } else if (response === 803 || response === 804) {
      document.body.style.backgroundImage= "url('../assets/img/clouds.jpg')";
    }
  }


}
