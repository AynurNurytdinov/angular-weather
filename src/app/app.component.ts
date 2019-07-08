import { Component, AfterViewInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  city: string;
  lang = 'ru';

  constructor(private service: WeatherService) {}

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        this.service.getWeatherByLocation(location.coords.latitude, location.coords.longitude, this.lang).subscribe(
          (res) => {
            console.log(res);
          }
        );
      },
      (err) => {
        this.city = 'Kazan';
        this.service.getWeatherByName(this.city, this.lang).subscribe(
          (res) => {
            console.log(res);
          }
        );
      }
    );
  }

}
