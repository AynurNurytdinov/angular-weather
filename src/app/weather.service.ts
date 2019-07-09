import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://gist.githubusercontent.com/' +
      'anonymous/feb1b31516f3e36a14b29657701f18d2/raw/eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json';
  }

  getWeather() {
    return this.http.get<any>(this.url);
  }
}
