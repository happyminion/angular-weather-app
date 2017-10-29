import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class WeatherHttpService {


  apiID = '&APPID=b15249a069bf7a1bbaef71e123c3bee5&units=metric';

  constructor(private http: Http) {

  }


  /*This function gets current weather from the OpenWeatherMap server and returns JSON*/
  getWeather(cityName: string) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + this.apiID).map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    );
  }

  /*This function gets user location and transforms the response (2) */
  getCurrentLocation(): Observable<any> {
    return this.http.get('http://ipinfo.io/json?callback')
      .map(response => {return response.json()})
      }


  /*This function gets weather forecast and returns JSON*/

  getWeatherForecast(cityName: string, countryCode: string) {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + (',') + countryCode + this.apiID).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
    )
  }

/*This function gets daily weather forecast and returns JSON*/
  getTodayWeather(cityName: string, countryCode: string) {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + (',') + countryCode + this.apiID).map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    )
  }

}
